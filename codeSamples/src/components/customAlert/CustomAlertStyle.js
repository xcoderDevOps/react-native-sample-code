import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    alertGradientContainer: {
      // paddingHorizontal: 20,
      // paddingVertical: 15,
      borderRadius: 10,
      marginBottom: 30,
      marginHorizontal: 20,
      // alignItems: 'center',
      width: dimens.w89_6,
      height: 64,
    },
    parentContainer: {flex: 1, justifyContent: 'center'},
    mainContainer: {paddingHorizontal: dimens.w3},
    headingTextStyle: {
      color: props.colors.white,
      fontSize: fontsizes.FONT_16_PX,
      fontFamily: font.PlaceHolder_overline_Inter_Semi_Bold,
      bottom: 3,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    messageTextStyle: {
      color: props.colors.white,
      fontSize: fontsizes.FONT_14_PX,
      fontFamily: font.Body2_Inter_Regular,
    },
    conditionalStyle: {
      color: props.colors.white,
      fontSize: fontsizes.FONT_14_PX,
      fontFamily: font.Body2_Inter_Regular,
    },
    numberText: {
      color: props.colors.white,
      fontFamily: font.Heading1_Oswald_Light,
      fontSize: fontsizes.FONT_32_PX,
    },
    imageStyle: {width: dimens.w8, height: dimens.h5},
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
