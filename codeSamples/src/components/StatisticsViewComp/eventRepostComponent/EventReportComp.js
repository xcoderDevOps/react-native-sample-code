import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {PieChart} from 'react-native-gifted-charts';
import {useTheme} from '@react-navigation/native';
import useStyles from './EventReportCompStyle';

const EventReportComp = () => {
  const styles = useStyles();
  const {colors} = useTheme();
  const pieData = [
    {value: 30, color: colors.warningorange},
    {value: 90, color: colors.red},
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.totalEventContainer}>
            <Text style={styles.noEventTextStyle}>1000</Text>
            <Text style={styles.totalEventTextStyle}>
              Total Events Reported
            </Text>
          </View>
          <View style={styles.crimeIncidentContainer}>
            <View style={styles.noCrimeTextStyle}>
              <Icon name="dot-single" size={32} color={colors.red} />
              <Text style={styles.crimeNumberStyle}>250 </Text>
              <Text style={styles.crimeTextStyle}>Crimes</Text>
            </View>
            <View style={styles.incidentContainer}>
              <Icon name="dot-single" size={32} color={colors.warningorange} />
              <Text style={styles.incidentNumberStyle}>750 </Text>
              <Text style={styles.crimeTextStyle}>Incidents</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <PieChart donut innerRadius={53} radius={65} data={pieData} />
        </View>
      </View>
    </View>
  );
};

export default EventReportComp;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//     marginTop: 30,
//     width: '100%',
//     height: 169,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#D8D8D8',
//     alignSelf: 'center',
//     padding: 1.5,
//   },
//   container: {flex: 1, flexDirection: 'row'},
//   leftContainer: {flex: 1, backgroundColor: '#fff'},
//   totalEventContainer: {flex: 1, justifyContent: 'center', paddingLeft: 20},
//   noEventTextStyle: {
//     fontSize: 32,
//     fontFamily: 'Oswald-Light',
//     color: '#000',
//     letterSpacing: 1.28,
//   },
//   totalEventTextStyle: {
//     fontSize: 14,
//     fontFamily: 'Inter-Regular',
//     color: '#646464',
//   },
//   crimeIncidentContainer: {flex: 1, paddingLeft: 12, top: 10},
//   noCrimeTextStyle: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     // borderWidth: 1,
//     alignItems: 'center',
//   },
//   crimeNumberStyle: {
//     fontSize: 16,
//     fontFamily: 'Inter-SemiBold',
//     color: '#000',
//   },
//   crimeTextStyle: {color: '#646464'},
//   incidentContainer: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     // borderWidth: 1,
//     alignItems: 'center',
//   },
//   incidentNumberStyle: {
//     fontSize: 16,
//     fontFamily: 'Inter-SemiBold',
//     color: '#000',
//   },
//   rightContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
