import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    commentTextInputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: dimens.w4,
      alignContent: 'center',
    },
    imageStyl: {
      width: dimens.w8,
      height: dimens.w8,
      alignSelf: 'flex-start',
      borderRadius: dimens.w4,
    },
    level2View: {
      //   backgroundColor: 'red',
      flex: 1,
      flexDirection: 'row',
      marginStart: dimens.w10,
      padding: dimens.h1,
    },
    view2: {
      flexDirection: 'column',
      flex: 1,
      marginStart: dimens.w2,
      alignContent: 'center',
      justifyContent: 'center',
    },
    view3: {
      // backgroundColor: 'red',
      flex: 1,
      flexDirection: 'row',
      width: dimens.w92,
      padding: dimens.h1,
    },
    view4: {
      flexDirection: 'column',
      flex: 1,
      marginStart: dimens.w2,
      alignContent: 'center',
      justifyContent: 'center',
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
