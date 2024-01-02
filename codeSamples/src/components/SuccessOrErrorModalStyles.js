import {StyleSheet, Platform} from 'react-native';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import {dimens, fontsizes} from '../constants/dimens';
import font from '../constants/font';

const getStyles = props =>
  StyleSheet.create({
    modalStyle: {
      margin: 0,
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    absolute: {
      position: 'absolute',
      height: 100,
      width: 100,
    },
    blurView: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    nextArrowImage: {
      width: 15,
      height: 15,
      alignSelf: 'center',
    },
    titleText: {
      fontFamily: font.Heading2_Oswald_Light,
      color: props.colors.black60,
      fontSize: fontsizes.FONT_24_PX,
      letterSpacing: 0.96,
      textTransform: 'uppercase',
      lineHeight: 32,
    },
    desText: {
      fontFamily: font.Body1_Inter_Regular,
      color: props.colors.black40,
      fontSize: fontsizes.FONT_16_PX,
      lineHeight: 22,
      textAlign: 'center',
      marginTop: 8,
      marginBottom: dimens.h3,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
