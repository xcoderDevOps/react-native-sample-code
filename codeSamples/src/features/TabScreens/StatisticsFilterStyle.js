import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    headLeftArrow: {
      width: dimens.w6,
      height: dimens.w6,
    },
    topView: {
      paddingHorizontal: dimens.w4,
      marginTop: dimens.h2,
    },
    topView2: {
      paddingHorizontal: dimens.w4,
      // marginTop: dimens.h1,
    },
    input: {
      flex: 1,
      marginRight: 8,
      fontFamily: font.PlaceHolder_overline_Inter_Semi_Bold,
      fontSize: fontsizes.FONT_12_PX,
      color: props.colors.black60,
    //   lineHeight: 44,
    //   letterSpacing: 0.48,
      textTransform: 'uppercase',
    },
    disabledInput: {
      backgroundColor: props.colors.white, // Change the background color to visually indicate it's disabled
      opacity: 0.7, // Adjust opacity to make it visually disabled
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
