import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import useStyles from './SplashStyles';
import images from '../../constants/images';
import {commonStackIdentifier} from '../../../App';
import * as AsyncStore from '../../asyncstorage/index';
import Video from 'react-native-video';
import {dimens} from '../../constants/dimens';
const Splash = ({props}) => {
  const styles = useStyles();
  useEffect(() => {
    setTimeout(() => {
      AsyncStore.getJsonData(AsyncStore.Keys.SIGN_UP_STEP).then(value => {
        console.log('SIGN_UP_STEP = ', value, '  ', typeof value);
        if (value == '1') {
          props.navigation.replace(commonStackIdentifier.signup_screen);
        } else if (value == '2') {
          props.navigation.replace(commonStackIdentifier.drawer_navigatore);
        } else {
          props.navigation.replace(
            commonStackIdentifier.intro_communitySafetyScreen,
          );
        }
      });
    }, 4000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="white" barStyle="dark-content" />
      <Video
        resizeMode="cover"
        source={images.splash_video}
        muted={true}
        style={{
          width: dimens.w100,
          height: dimens.h100,
          alignSelf: 'center',
        }}
        // controls={true}
      />
    </View>
  );
};

export default Splash;
