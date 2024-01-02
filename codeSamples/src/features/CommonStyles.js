import {StyleSheet, Platform} from 'react-native';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../constants/font';
import {dimens, fontsizes} from '../constants/dimens';

const getStyles = props =>
  StyleSheet.create({
    flex_1: {
      flex: 1,
      backgroundColor: props.colors.white,
    },

    heading3: {
      fontFamily: font.Heading3_Oswald_Light,
      fontSize: fontsizes.FONT_24_PX,
      color: props.colors.black60,
    },
    body1: {
      fontFamily: font.Body1_Inter_Regular,
      fontSize: fontsizes.FONT_16_PX,
      color: props.colors.black50,
      lineHeight: 22,
    },

    PlaceholderNOverline: {
      fontFamily: font.PlaceHolder_overline_Inter_Semi_Bold,
      fontSize: fontsizes.FONT_12_PX,
      color: props.colors.black60,
      lineHeight: 44,
      letterSpacing: 0.48,
      textTransform: 'uppercase',
    },
    subTitlesNbuttons: {
      fontFamily: font.SubtitleNButton_Inter_Semi_Bold,
      fontSize: fontsizes.FONT_16_PX,
      color: props.colors.black60,
      lineHeight: 24,
      marginBottom: dimens.h1,
    },

    body2: {
      fontFamily: font.Body2_Inter_Regular,
      fontSize: fontsizes.FONT_14_PX,
      color: props.colors.black60,
      lineHeight: 20,
    },
    flex_direction_row: {
      flexDirection: 'row',
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
