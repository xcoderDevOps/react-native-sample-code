import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import images from '../../constants/images';
import EventReportComp from './eventRepostComponent/EventReportComp';
import ThreadAlertComp from './threadAlertComp/ThreadAlertComp';
import EventOverViewComp from './eventOverViewComp/EventOverViewComp';
import EventFrequencyComp from './eventFrequncyComp/EventFrequencyComp';
import {strings} from '../../constants/Strings';
import useStyles from './StatisticsViewCompStyle';

const StatisticsViewComp = () => {
  const styles = useStyles();
  return (
    <View>
      <View style={styles.eventReportStyle}>
        <EventReportComp />
      </View>
      <View style={styles.rowContainer}>
        <ThreadAlertComp
          onPress={() => {}}
          icon={images.halfAlert}
          header={strings.total_alert}
          subText={'20'}
          showArrow={false}
          customStyle={styles.totalThreadCardStyle}
        />
        <ThreadAlertComp
          onPress={() => {}}
          icon={images.handsing}
          header={'Currently Active'}
          subText={'04'}
          customStyle={styles.activeThreadCardStyle}
        />
      </View>
      <View style={styles.eventOverViewStyle}>
        <EventOverViewComp />
        <EventFrequencyComp />
      </View>
    </View>
  );
};

export default StatisticsViewComp;
