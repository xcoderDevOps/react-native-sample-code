import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import BellIcon from 'react-native-vector-icons/FontAwesome';
import images from '../../constants/images';
import { useNavigation } from '@react-navigation/native';
import { dimens } from '../../constants/dimens';

const Header = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.headerContainer}>
      {/* flex: 0.5, */}
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          {/* <Icon name="menu" size={30} color="#000" /> */}
          <Image
            style={styles.menuImageStyle}
            resizeMode='contain'
            source={images.hamburger}
          />
        </TouchableOpacity>
        <View>
          <Image
            style={styles.codesamplesImgStyle}
            resizeMode='contain'
            source={images.codesamples}
          />
        </View>
        <View>
          <Image
            style={styles.bellImgStyle}
            resizeMode='contain'
            source={images.notification_bell}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: { flexDirection: 'column-reverse' },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : dimens.h2,
  },
  menuImageStyle: { width: 28, height: 28 },
  codesamplesImgStyle: { width: 150, height: 40 },
  bellImgStyle: { width: 32, height: 32 },
});
