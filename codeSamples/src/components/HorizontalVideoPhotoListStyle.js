import {StyleSheet, Platform} from 'react-native';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../constants/font';
import {dimens, fontsizes} from '../constants/dimens';

const getStyles = props => StyleSheet.create({ imageStylVideo: {
    width: dimens.w19,
    height: dimens.w19,
    overflow:"hidden",
    borderRadius: dimens.h1,
  },});

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
