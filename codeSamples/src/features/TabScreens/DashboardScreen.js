import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../components/headerComponent/Header';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import images from '../../constants/images';
import useStyles from './DashboardStyle';
import codesamplesPremiumViewComp from '../../components/codesamplesPremiumComp/codesamplesPremiumViewComp';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CustomSegmentedControl from '../../components/CustomSegmentedControl';
import StatisticsViewComp from '../../components/StatisticsViewComp/StatisticsViewComp';
import ListViewComp from '../../components/listViewComp/ListViewComp';
import MapViewComp from '../../components/mapViewComp/MapViewComp';
import { defaultStyle } from './GoogleplaceStyle';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLocationDescription,
  setUserLocation,
} from '../../commonSlices/mapViewSlice';
import { API_KEY } from '../../utilities/helperFunction';
import { commonStackIdentifier } from '../../../App';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const styles = useStyles();
  const dispatch = useDispatch();
  const selectedLocation = useSelector(selectLocationDescription);
  let toggle = false;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSegmentPress = (index) => {
    setSelectedIndex(index);
    // Handle logic for the selected segment
  };

  const handlePlaceSelection = (data, details = null) => {
    const { lat, lng } = details?.geometry?.location;
    dispatch(setUserLocation({ lat, lng }));
  };

  const segments = ['Statistics', 'List View', 'Map View'];

  const renderTabContent = [
    <ScrollView key={0}>
      <StatisticsViewComp />
    </ScrollView>,
    <View style={{ flex: 1 }} key={1}>
      <ListViewComp />
    </View>,
    <ScrollView bounces={false} contentContainerStyle={{}} key={2}>
      <MapViewComp />
    </ScrollView>,
  ];

  return (
    <View style={styles.parentContainer}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.dashboardViewContainer}>
        {toggle ? (
          <codesamplesPremiumViewComp />
        ) : (
          <ScrollView
            style={{ flex: 1 }}
            bounces={false}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(commonStackIdentifier.google_autocomplete)
                }
                style={styles.eventBtnContainer}
              >
                <View style={styles.rowContainer}>
                  <Text>
                    {selectedLocation || 'Current user location (default)'}
                  </Text>
                  <View />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <TouchableOpacity style={styles.eventBtnContainer}>
                <View style={styles.rowContainer}>
                  <Text>Last 30 days</Text>
                  <Image
                    style={{}}
                    resizeMode='contain'
                    source={images.calender}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <CustomSegmentedControl
              segments={segments}
              selectedIndex={selectedIndex}
              onSegmentPress={handleSegmentPress}
              renderTabContent={renderTabContent}
            />
            {/* </View> */}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default DashboardScreen;
