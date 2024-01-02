import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  StatusBar,
  PermissionsAndroid,
  Platform,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Header from '../../components/headerComponent/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FAB} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../constants/images';
import useStyles from './HomeStyle';
import {useTheme} from '@react-navigation/native';
import CustomBottomSheet from '../../components/CustomeBottomSheet';
import EventTypeChip from '../../components/chipComponent/EventTypeChip';
import SeverityLevelChip from '../../components/chipComponent/SeverityLevelChip';
import RadiusChip from '../../components/chipComponent/RadiusChip';
import CustomAlert from '../../components/customAlert/CustomAlert';
import RBSheet from 'react-native-raw-bottom-sheet';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapComponent from '../../components/MapComponent';
import {strings} from '../../constants/Strings';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const styles = useStyles();
  const {colors} = useTheme();
  const sheetRef = useRef();
  const mapRef = useRef(null);

  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [locationStatus, setLocationStatus] = useState('');

  const [region, setRegion] = useState({
    latitude: 23.0225,
    longitude: 72.5714,
    latitudeDelta: 0.115,
    longitudeDelta: 0.121 * (width / height),
  });

  const data = [
    {key: 'eventType', text: 'Event Type'},
    {key: 'severityLevel', text: 'Severity Level'},
    {key: 'radius', text: 'Radius'},
  ];

  useEffect(() => {
    // requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('permission granted');
          //To Check, If Permission is granted
          getOneTimeLocation();
          subscribeLocationLocation();
        } else {
          showEnableLocationPopup();
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      showAlert();
    }, 1500);
  }, []);

  const showAlert = () => {
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const handleMyLocation = () => {
    try {
      const latitude = parseFloat(currentLatitude);
      const longitude = parseFloat(currentLongitude);
      if (!isNaN(latitude) && !isNaN(longitude)) {
        const newRegion = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        };

        // Animate the user to the new region. Complete this animation in 3 seconds
        mapRef.current.animateToRegion(newRegion, 3 * 1000);
      } else {
        console.warn('Invalid latitude or longitude values');
        showEnableLocationPopup();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...kjsjk');
    try {
      Geolocation.getCurrentPosition(
        //Will give you the current location
        position => {
          // console.log('getCurrentPosition-------', position);
          const {latitude, longitude} = position.coords;
          setLocationStatus('You are Here');

          // setCurrentLatitude(position.coords.latitude);
          // setCurrentLongitude(position.coords.longitude);
          const currentLongitude = JSON.stringify(position.coords.longitude);

          //getting the Latitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);

          //Setting Longitude state
          setCurrentLongitude(currentLongitude);

          //Setting Latitude state
          setCurrentLatitude(currentLatitude);
          setRegion(prevRegion => ({
            ...prevRegion,
            latitude: latitude,
            longitude: longitude,
          }));
        },
        error => {
          setLocationStatus(error.message);
          console.log('error.message------', error.message);
        },
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 1000,
        },
      );
    } catch (error) {
      console.warn(error);
    }
  };

  const subscribeLocationLocation = () => {
    try {
      Geolocation.watchPosition(
        position => {
          //Will give you the location on location change

          setLocationStatus('You are Here');
          // console.log('position-------', position);
          const {latitude, longitude} = position.coords;
          // setCurrentLatitude(position.coords.latitude);
          // setCurrentLongitude(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLongitude = JSON.stringify(position.coords.longitude);

          //getting the Latitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);

          //Setting Longitude state
          setCurrentLongitude(currentLongitude);

          //Setting Latitude state
          setCurrentLatitude(currentLatitude);
        },
        error => {
          setLocationStatus(error.message);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 1000,
        },
      );
    } catch (error) {
      console.warn(error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => openBottomSheet(item.text)}
      style={{
        borderWidth: StyleSheet.hairlineWidth,
        marginHorizontal: 5,
        alignSelf: 'center',
        borderRadius: 36,
        borderColor: '#D8D8D8',
        padding: 4,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
          justifyContent: 'space-between',
        }}>
        <Text style={{color: 'black'}}>{item.text}</Text>
        <Icon name="arrow-drop-down" size={26} color="#000" />
      </View>
    </TouchableOpacity>
  );

  const openBottomSheet = itemText => {
    setSelectedItem(itemText);
    sheetRef?.current?.open();
  };

  const closeBottomSheet = () => {
    setSelectedItem(null);
    sheetRef?.current?.close();
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.headerContainer}>
        <Header />
        <View style={styles.listChipContainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            horizontal={true}
            style={{paddingLeft: 15}}
          />

          <RBSheet
            ref={sheetRef}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={183}
            customStyles={{
              container: styles.bottomSheetContentStyle,
              wrapper: {},
              draggableIcon: {
                backgroundColor: '#transparent',
              },
            }}>
            <CustomBottomSheet
              selectedItem={selectedItem}
              onClose={closeBottomSheet}
            />
          </RBSheet>
        </View>
      </View>

      <View style={styles.middleComponent}>
        <View style={styles.container}>
          {/* -------------- Map goes here -------------- */}
          <MapComponent
            mapRef={mapRef}
            region={region}
            currentLatitude={currentLatitude}
            currentLongitude={currentLongitude}
            handleMyLocation={handleMyLocation}
            colors={colors}
            styles={styles}
          />
        </View>
        <View>
          <CustomAlert
            heading={strings.alert}
            visible={alertVisible}
            firstMessage="URGENT: Armed robbery reported at..."
            onClose={hideAlert}
            duration={2000}
            customStyle={{top: 180}}
          />
        </View>
      </View>
    </View>
  );
};

const showEnableLocationPopup = () => {
  Alert.alert(strings.locationAccess, strings.locationAccessText, [
    {
      text: strings.cancel,
      style: strings.cancel,
    },
    {
      text: strings.goSettings,
      onPress: () => {
        // Open the device settings for the app
        Linking.openSettings();
      },
    },
  ]);
};

export default HomeScreen;

const styles = StyleSheet.create({});
