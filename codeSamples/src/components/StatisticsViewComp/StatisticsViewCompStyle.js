import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    eventReportStyle: {marginLeft: dimens.w5, marginRight: dimens.w5},
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: dimens.h2,
      marginLeft: dimens.w5,
      marginRight: dimens.w5,
    },
    eventOverViewStyle: {marginLeft: dimens.w5, marginRight: dimens.w5},
    eventFrequencyStyle: {marginLeft: 20, marginRight: 20},
    totalThreadCardStyle: {
      flex: 1,
      backgroundColor: props.colors.black10,
      width: dimens.w70,
      height: dimens.h10,
      marginRight: dimens.h1,
      borderRadius: 8,
    },
    activeThreadCardStyle: {
      flex: 1,
      backgroundColor: props.colors.red,
      width: dimens.w70,
      height: dimens.h10,
      marginLeft: dimens.h1,
      borderRadius: 8,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
