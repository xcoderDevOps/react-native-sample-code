import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Pressable,
  Text,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import images from '../../constants/images';
import {useTheme} from '@react-navigation/native';
import font from '../../constants/font';
import {dimens, fontsizes} from '../../constants/dimens';
import CommonStyles from '../../features/CommonStyles';

const HeaderWithText = props => {
  const {colors} = useTheme();
  const {
    title,
    titleStyles,
    prefixIcon,
    onPrefixPress,
    suffixIcon = '',
    onSuffixPress,
    suffixIconColor,
    ispreFixVisible = true,
    prefixStyle = {},
    prefixIconColor = '#000000',
    suffixText = '',
    onSuffixTextPress,
    imageIcon,
    imageIconStyle,
    imageIconColor,
  } = props;
  const commonStyles = CommonStyles();
  return (
    // <SafeAreaView style={{flex: 0.5}}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: dimens.w5,
        alignItems: 'center',
        // flex: 1,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Pressable onPress={onPrefixPress}>
          <Image style={prefixStyle} source={prefixIcon} resizeMode="center" />
        </Pressable>
        <View>
          <Text
            style={[
              titleStyles,
              styles.titleStylesLocal,
              [{color: colors.black60}],
            ]}>
            {title}
          </Text>
        </View>
      </View>
      {suffixText.length > 0 && (
        <Pressable onPress={onSuffixTextPress}>
          <Text
            style={[
              commonStyles.body1,
              {textAlign: 'right', color: colors.infoblue},
            ]}>
            {suffixText}
          </Text>
        </Pressable>
      )}

      {suffixIcon.length > 0 ? (
        <Pressable onPress={onSuffixPress}>
          <MaterialIcons name={suffixIcon} size={30} color={suffixIconColor} />
        </Pressable>
      ) : (
        <>
          {imageIcon && (
            <Pressable>
              <Image
                style={imageIconStyle}
                source={imageIcon}
                resizeMode="center"
              />
            </Pressable>
          )}
        </>
      )}
    </View>
    // </SafeAreaView>
  );
};

export default HeaderWithText;

const styles = StyleSheet.create({
  titleStylesLocal: {
    fontFamily: font.Heading2_Oswald_Light,
    fontSize: fontsizes.FONT_24_PX,
    textTransform: 'uppercase',
    lineHeight: 32,
    letterSpacing: 0.96,
    marginStart: dimens.w3,
  },
  suffixSty: {},
});
