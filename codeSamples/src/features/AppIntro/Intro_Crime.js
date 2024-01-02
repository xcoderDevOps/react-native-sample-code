import {View, Text, Image, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {commonStackIdentifier} from '../../../App';
import useStyles from './Intro_CrimeStyle';
import {useTheme} from '@react-navigation/native';
import images from '../../constants/images';
import withPreventDoubleClick from '../../utilities/withPreventDoubleClick';
import {strings} from '../../constants/Strings';

import {dimens} from '../../constants/dimens';
import BluredPrivacyMattersModel from '../../components/BluredPrivacyMattersModel';
import ButtonComp from '../../components/buttonComponent/ButtonComp';
import * as AsyncStore from '../../asyncstorage/index';
const TouchableOpacity = withPreventDoubleClick();
const Intro_Crime = ({props}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />

      {/* <View style={styles.imageContainer}> */}
      <Image
        source={images.crimePrevention}
        resizeMode={'cover'}
        style={styles.topImage}
      />
      {/* </View> */}

      <BluredPrivacyMattersModel
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      />

      <View style={styles.secondContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{strings.crime_prevention}</Text>
          <Text style={styles.discriptionText}>
            {strings.crime_prevention_des}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity
            style={styles.tochable}
            onPress={() => {
              setModalVisible(true);
              // props.navigation.replace(commonStackIdentifier.signup_screen);
            }}>
            <Text style={styles.skipSty}>{'Skip All'}</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.tochablered}
            onPress={() => {
              props.navigation.navigate(
                commonStackIdentifier.intro_crimescreen,
              );
            }}>
            <Text style={styles.nextSty}>{'Next 1/3'}</Text>
          </TouchableOpacity> */}
          <ButtonComp
            icon="arrowright"
            label="Sign Up"
            onPress={() => {
              // toggleModal();
              AsyncStore.storeJsonData(AsyncStore.Keys.SIGN_UP_STEP, '1');
              props.navigation.navigate(commonStackIdentifier.signup_screen);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Intro_Crime;
