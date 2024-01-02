import {View, Text, Image, StatusBar} from 'react-native';
import React from 'react';
import useStyles from './Intro_RealTimeStyles';
import {useTheme} from '@react-navigation/native';
import images from '../../constants/images';
import {commonStackIdentifier} from '../../../App';
import withPreventDoubleClick from '../../utilities/withPreventDoubleClick';
import {strings} from '../../constants/Strings';
import * as AsyncStore from '../../asyncstorage/index';
import ButtonComp from '../../components/buttonComponent/ButtonComp';
import {dimens} from '../../constants/dimens';
const TouchableOpacity = withPreventDoubleClick();

const Intro_RealTime = ({props}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />

      {/* <View style={styles.imageContainer}> */}
      <Image
        source={images.realTime_incitent}
        resizeMode={'cover'}
        style={styles.topImage}
      />
      {/* </View> */}

      <View style={styles.secondContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{strings.real_time_incident}</Text>
          <Text style={styles.discriptionText}>
            {strings.real_time_incident_des}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.tochable}
            onPress={() => {
              AsyncStore.storeJsonData(AsyncStore.Keys.SIGN_UP_STEP, '1');
              props.navigation.replace(commonStackIdentifier.signup_screen);
            }}>
            <Text style={styles.skipSty}>{'Skip All'}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.tochablered}
            onPress={() => {
              props.navigation.navigate(
                commonStackIdentifier.intro_crimescreen,
              );
            }}>
            <Text style={styles.nextSty}>{'Next 2/3'}</Text>
          </TouchableOpacity> */}
          <ButtonComp
            label={'Next 2/3'}
            onPress={() => {
              props.navigation.navigate(
                commonStackIdentifier.intro_crimescreen,
              );
            }}
            customStyle={{width: dimens.w38}}
          />
        </View>
      </View>
    </View>
  );
};

export default Intro_RealTime;
