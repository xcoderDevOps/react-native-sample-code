import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.colors.white,
      width: dimens.w92,
    //   padding: dimens.h1,
    },
    imageStyl: {
      width: dimens.w8,
      height: dimens.w8,
      //   alignSelf: 'flex-start',
      borderRadius: dimens.w4,
      borderColor: props.colors.green,
      borderWidth: 0.5,
    },
    viewMain: {
    //   flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical:dimens.h2
      //   width: dimens.w92,
      //   padding: dimens.h1,
    },
    view2: {
      width: dimens.w8,
      height: dimens.w8,

      borderRadius: dimens.w4,

      alignItems: 'center',
      justifyContent: 'center',
    },
    imageStylVerified: {
      width: dimens.w7,
      height: dimens.w5,
      //   alignSelf: 'flex-start',
      borderRadius: dimens.w4,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
