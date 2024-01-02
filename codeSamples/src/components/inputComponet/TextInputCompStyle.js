import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    inputMainContainerStyle: {
      fontSize: fontsizes.FONT_16_PX,
      marginVertical: dimens.h1_2,
      width: dimens.w85,
      height: dimens.h6_5,
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: props.colors.white,
    },
    contentContainerStyle: {
      fontFamily: font.Body1_Inter_Regular,
      color: props.colors.black60,
      fontSize: fontsizes.FONT_16_PX,
      // fontWeight:"400",
      // lineHeight:22,
    },
    labelStyle: {
      fontFamily: font.PlaceHolder_overline_Inter_Semi_Bold,
      fontSize: fontsizes.FONT_12_PX,
      // fontWeight: '600',
      letterSpacing: 0.48,
      textTransform: 'uppercase',
      // color: '#969696',
      backgroundColor: props.colors.white,
      lineHeight: 44,
    },
    inputOutlineStyle: {borderRadius: 8},
    themePrimaryColor: {colors: {primary: props.colors.black30}},
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
