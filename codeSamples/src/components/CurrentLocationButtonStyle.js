import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../constants/font';

const getStyles = props =>
  StyleSheet.create({
    container: {
      marginTop: dimens.h1_8,
      width: '100%',
      height: dimens.h4_8,
      // borderWidth: 1,
      borderRadius: 8,
      flexDirection: 'row',
      backgroundColor: props.colors.infoblue,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mavViewContainer: {
      marginTop: dimens.h2_8,
      width: '100%',
      height: dimens.h4_8,
      borderWidth: 1,
      borderColor: props.colors.infoblue,
      borderRadius: 8,
      flexDirection: 'row',
      // backgroundColor: props.colors.infoblue,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapTextStyle: {
      marginLeft: dimens.w1_2,
      fontFamily: font.Body1_Inter_Regular,
      fontSize: fontsizes.FONT_16_PX,
      color: props.colors.infoblue,
    },
    locationTextStyle: {
      marginLeft: dimens.w1_2,
      fontFamily: font.Body1_Inter_Regular,
      fontSize: fontsizes.FONT_16_PX,
      color: props.colors.white,
    },
    gpsIconStyle: {width: dimens.w5, height: dimens.h3},
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
