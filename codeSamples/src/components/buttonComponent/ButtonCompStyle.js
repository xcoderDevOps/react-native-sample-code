import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    buttonContainerStyle: {
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      alignSelf: 'center',
      width: dimens.w85,
      height: dimens.h5_7,
      borderRadius: 8,
      flexDirection: 'row',
      paddingHorizontal: dimens.w4,
      // shadowColor: props.colors.boxShadow,
      // shadowOffset: {
      //   width: 0,
      //   height: 3,
      // },
      // shadowOpacity: 0.17,
      // shadowRadius: 3.05,
      // elevation: 14,
      borderRadius: 8,
      shadowColor: props.colors.boxShadow,
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 4, // This is for Android elevation shadow
    },
    labelStyle: {
      color: props.colors.white,
      fontSize: fontsizes.FONT_16_PX,
      fontFamily: font.SubtitleNButton_Inter_Semi_Bold,
    },
    iconStyle: {width: dimens.w6, height: dimens.h3},
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
