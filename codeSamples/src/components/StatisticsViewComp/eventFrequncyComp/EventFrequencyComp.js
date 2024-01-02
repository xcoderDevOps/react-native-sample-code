import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {BarChart} from 'react-native-gifted-charts';
import {dimens} from '../../../constants/dimens';
import useStyles from './EventFrequencyCompStyle';
import {useTheme} from '@react-navigation/native';

const EventFrequencyComp = () => {
  const styles = useStyles();
  const {colors} = useTheme();
  const [selectedEventType, setSelectedEventType] = useState('All Events');
  const [showLoadMore, setShowLoadMore] = useState(false);

  const eventTypes = ['All Events', 'Crime', 'Incident'];
  const eventData = [
    {value: 250, label: '12am'},
    {value: 500, label: '3am', frontColor: '#1BA2E8'},
    {value: 745, label: '6am', frontColor: '#1BA2E8'},
    {value: 320, label: '9am'},
    {value: 600, label: '12pm', frontColor: '#1BA2E8'},
    {value: 256, label: '3pm'},
    {value: 300, label: '6pm'},
  ];

  const crimeData = [
    {value: 100, label: '1am'},
    {value: 200, label: '2am', frontColor: '#DA1A35'},
    {value: 300, label: '4am', frontColor: '#DA1A35'},
    {value: 150, label: '3pm'},
    {value: 400, label: '5pm', frontColor: '#DA1A35'},
    {value: 120, label: '4pm'},
    {value: 180, label: '7pm'},
  ];

  const incidentData = [
    {value: 50, label: 'M'},
    {value: 120, label: 'T', frontColor: '#FFA500'},
    {value: 180, label: 'W', frontColor: '#FFA500'},
    {value: 90, label: 'T'},
    {value: 240, label: 'F', frontColor: '#FFA500'},
    {value: 80, label: 'S'},
    {value: 150, label: 'S'},
  ];

  const getEventData = () => {
    switch (selectedEventType) {
      case 'Crime':
        return crimeData;
      case 'Incident':
        return incidentData;
      default:
        return eventData;
    }
  };

  const renderProgressBars = () => {
    return (
      <BarChart
        barWidth={17}
        height={dimens.h15}
        noOfSections={3}
        // barBorderRadius={10}
        barBorderTopLeftRadius={10}
        barBorderTopRightRadius={10}
        frontColor={colors.infoblue}
        data={getEventData()}
        yAxisThickness={0}
        xAxisThickness={1}
        xAxisColor={colors.black20}
        spacing={26}
        // stepValue={1}
        isAnimated={true}
        // animationDuration={1000}
        // isThreeD={true}
        hideYAxisText={true}
        hideRules={true}
        xAxisLabelTextStyle={{
          color: colors.black30,
          textTransform: 'uppercase',
        }}
      />
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.eventFrequencyText}>Event Frequency</Text>
      <View style={styles.segmentedButtons}>
        {eventTypes.map(eventType => (
          <TouchableOpacity
            key={eventType}
            style={[
              styles.segmentButton,
              selectedEventType === eventType && styles.selectedSegmentButton,
            ]}
            onPress={() => {
              setSelectedEventType(eventType);
              setShowLoadMore(false);
            }}>
            <Text
              style={[
                styles.eventTypeTextStyle,
                {
                  color:
                    selectedEventType === eventType ? '#121212' : '#969696',
                },
              ]}>
              {eventType}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderProgressBars()}
    </ScrollView>
  );
};

export default EventFrequencyComp;
