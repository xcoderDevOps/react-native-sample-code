import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {dimens} from '../../../constants/dimens';
import useStyles from './EventOverViewCompStyle';
import {useTheme} from '@react-navigation/native';
import {strings} from '../../../constants/Strings';

const EventProgressComponent = () => {
  const styles = useStyles();
  const {colors} = useTheme();
  const [selectedEventType, setSelectedEventType] = useState('All Events');
  const [showLoadMore, setShowLoadMore] = useState(false);

  const eventTypes = ['All Events', 'Crime', 'Incident'];

  const eventData = [
    {eventType: 'Harassment', progress: 0.3, category: 'Crime'},
    {eventType: 'Robbery', progress: 0.5, category: 'Crime'},
    {eventType: 'Fire', progress: 0.7, category: 'Incident'},
    {eventType: 'Accident', progress: 0.2, category: 'Incident'},
    // Add more events as needed
  ];

  const filteredEvents = showLoadMore
    ? eventData
    : eventData.filter(
        event =>
          event.category === selectedEventType ||
          selectedEventType === 'All Events',
      );

  const renderProgressBars = () => {
    return filteredEvents.map(({eventType, progress}, index) => (
      <View key={index} style={styles.progressBarContainer}>
        <Text style={styles.progressLabel}>{eventType}</Text>
        <View style={styles.progressBarRow}>
          <Progress.Bar
            progress={progress}
            width={dimens.w70}
            color={colors.infoblue}
            style={{backgroundColor: colors.black10, borderWidth: 0}}
          />
          <Text style={styles.progressNumber}>{`${(progress * 100).toFixed(
            0,
          )}%`}</Text>
        </View>
      </View>
    ));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.eventOverViewText}>Event Overview</Text>
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
                    selectedEventType === eventType
                      ? colors.black60
                      : colors.black30,
                },
              ]}>
              {eventType}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderProgressBars()}

      {showLoadMore && (
        <View style={styles.loadMoreContainer}>
          {eventData.map(({eventType, progress}, index) => (
            <View key={index} style={styles.progressBarContainer}>
              <Text style={styles.progressLabel}>{eventType}</Text>
              <View style={styles.progressBarRow}>
                <Progress.Bar
                  progress={progress}
                  width={dimens.w70}
                  color={colors.infoblue}
                  style={styles.progressBarMainContainer}
                />
                <Text style={styles.progressNumber}>{`${(
                  progress * 100
                ).toFixed(0)}%`}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={styles.loadMoreButton}
        onPress={() => setShowLoadMore(!showLoadMore)}>
        <Text style={styles.loadMoreTextStyle}>
          {showLoadMore ? strings.show_less : strings.load_more}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EventProgressComponent;
