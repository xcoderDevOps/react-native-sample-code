import {View, Text, Image, StatusBar} from 'react-native';
import React from 'react';
import {commonStackIdentifier} from '../../../App';
import images from '../../constants/images';
import useStyles from './Intro_CommunityStyle';
import {useTheme} from '@react-navigation/native';
import withPreventDoubleClick from '../../utilities/withPreventDoubleClick';
import {strings} from '../../constants/Strings';
import * as AsyncStore from '../../asyncstorage/index';
import {dimens} from '../../constants/dimens';
import ButtonComp from '../../components/buttonComponent/ButtonComp';
const TouchableOpacity = withPreventDoubleClick();

const Intro_CommunitySafety = ({props}) => {
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
        source={images.community_safety}
        resizeMode={'cover'}
        style={styles.topImage}
      />
      {/* </View> */}

      <View style={styles.secondContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{strings.community_safety}</Text>
          <Text style={styles.discriptionText}>
            {strings.community_safety_des}
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
                commonStackIdentifier.intro_realtimescreen,
              );
            }}>
            <Text style={styles.nextSty}>{'Next 1/3'}</Text>
          </TouchableOpacity> */}
          <ButtonComp
            label={'Next 1/3'}
            onPress={() => {
              props.navigation.navigate(
                commonStackIdentifier.intro_realtimescreen,
              );
            }}
            customStyle={{width: dimens.w38}}
          />
        </View>
      </View>
    </View>
  );
};

export default Intro_CommunitySafety;
