import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Image,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {API_KEY} from '../utilities/helperFunction';
import {useNavigation, useTheme} from '@react-navigation/native';
import useStyles from './CurrentLocationButtonStyle';
import images from '../constants/images';
import {commonStackIdentifier} from '../../App';
import {useDispatch} from 'react-redux';
import {setCrimeMapAddress} from '../commonSlices/mapViewSlice';

const CurrentLocationButton = ({onPress, mapViewButton}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const styles = useStyles();
  const [location, setLocation] = useState(null);

  const onMapPress = () => {
    // Navigate to the screen where your map is displayed
    navigation.navigate(commonStackIdentifier.crime_location_map);
  };

  const checkLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getCurrentLocation();
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
          console.log('------permission granted');
          //To Check, If Permission is granted
          getCurrentLocation();
        } else {
          // showPermissionDeniedAlert();
          console.log('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});

        // Call the onPress callback with the obtained location
        onPress && onPress({latitude, longitude});

        // Get place name using reverse geocoding
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
          );
          if (response.ok) {
            const data = await response.json();

            if (
              data.status === 'OK' &&
              data.results &&
              data.results.length > 0
            ) {
              const placeName = data.results[0].formatted_address;
              setLocation(prev => ({...prev, placeName}));
              dispatch(setCrimeMapAddress(placeName));

              // Call the onPress callback with the obtained place name
              onPress && onPress({latitude, longitude, placeName});
            } else {
              console.error('Error retrieving place name:', data.status);
            }
          } else {
            console.error('Error retrieving place name:', response.status);
          }
        } catch (error) {
          console.error('Error fetching place name:', error);
        }
      },
      error => {
        console.error('Error getting current location:', error);
        if (error.code === 3) {
          // Timeout error: Unable to fetch location within the specified timeout
          console.log('Unable to fetch location within the specified timeout');

          // Handle the error or set a default location
          setLocation({
            latitude: 23.0225,
            longitude: 72.5714,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        } else {
          // Other errors, e.g., PERMISSION_DENIED, POSITION_UNAVAILABLE
          console.log('-getCurrentPosition error getting-----', error);
          showPermissionDeniedAlert();
          // Handle the error or notify the user
        }
      },
      {enableHighAccuracy: false, timeout: 10000},
    );
  };

  // const getPlaceName = async (latitude, longitude) => {
  //   // The reverse geocoding logic remains the same, you can reuse it from the previous example
  //   // ...

  //   // Call the onPress callback with the obtained place name
  //   onPress && onPress({latitude, longitude, placeName});
  // };

  return (
    <>
      {mapViewButton ? (
        <TouchableOpacity style={styles.mavViewContainer} onPress={onMapPress}>
          <Image
            resizeMode="contain"
            source={images.push_pin}
            style={styles.gpsIconStyle}
          />
          <Text style={styles.mapTextStyle}>Select on map</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.container}
          onPress={checkLocationPermission}>
          <Image
            resizeMode="contain"
            source={images.gps}
            style={styles.gpsIconStyle}
          />
          <Text style={styles.locationTextStyle}>Use my current location</Text>
          {/* 
        uncomment below Text to show lat, long, and place name
      */}
          {/* {location && (
        <Text>
          Latitude: {location.latitude}, Longitude: {location.longitude}, Place
          Name: {location.placeName || 'N/A'}
        </Text>
      )} */}
        </TouchableOpacity>
      )}
    </>
  );
};

export default CurrentLocationButton;
