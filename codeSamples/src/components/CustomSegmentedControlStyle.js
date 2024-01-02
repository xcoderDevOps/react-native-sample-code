import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../constants/font';

const getStyles = props =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: 50,
      overflow: 'hidden',
      marginTop: dimens.h2,
      backgroundColor: props.colors.backgroundblue,
      height: dimens.h5_5,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
      marginRight: dimens.w4,
      marginLeft: dimens.w4,
    },
    segmentButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: dimens.w2,
      borderRadius: 50,
      height: dimens.h4_8,
      alignContent:"center"
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
