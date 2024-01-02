import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    imageContainer: {
      flex: 1,
    },
    topImage: {
      flex: 1,
      width: dimens.w100,
    },
    secondContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },
    titleText: {
      fontFamily: font.Heading1_Oswald_Light,
      color: props.colors.black60,
      fontSize: fontsizes.FONT_32_PX,
      fontWeight: '300',
      letterSpacing: 1.28,
      textTransform: 'uppercase',
      lineHeight: 44,
    },
    textContainer: {
      margin: dimens.w5,
    },
    discriptionText: {
      fontFamily: font.Body1_Inter_Regular,
      color: props.colors.black40,
      fontSize: fontsizes.FONT_16_PX,
      fontWeight: '400',
      lineHeight: 22,
      marginTop: dimens.h1,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      //   alignItems: 'center',
      //   alignContent: 'center',
      marginBottom: dimens.h2,
      paddingHorizontal: dimens.w5,
    },
    tochable: {
      width: dimens.w38,
      height: dimens.h5,
      backgroundColor: props.colors.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    skipSty: {
      fontFamily: font.SubtitleNButton_Inter_Semi_Bold,
      fontSize: fontsizes.FONT_16_PX,
      color: props.colors.black60,
      lineHeight: 19.36,
    },
    tochablered: {
      width: dimens.w38,
      height: dimens.h5,
      backgroundColor: props.colors.red,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      shadowColor: 'rgba(218, 26, 53, 0.24)',
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 4, // This is for Android elevation shadow
    },
    nextSty: {
      fontFamily: font.SubtitleNButton_Inter_Semi_Bold,
      fontSize: fontsizes.FONT_16_PX,
      color: props.colors.white,
      textAlign: 'center',
      lineHeight: 19.36,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
