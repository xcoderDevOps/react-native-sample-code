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
    topViewContainer: {
      paddingHorizontal: dimens.w4,
      marginTop: dimens.h2,
      marginBottom: dimens.h1,
    },
    colummnsSty: {
      flexDirection: 'column',
      marginVertical: dimens.h1_8,
      //   alignItems: 'center',
    },
    rowSty: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    imageStyl: {
      width: dimens.w5,
      height: dimens.w5,
    },
    imageStylVideo: {
      width: dimens.w15,
      height: dimens.w15,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
