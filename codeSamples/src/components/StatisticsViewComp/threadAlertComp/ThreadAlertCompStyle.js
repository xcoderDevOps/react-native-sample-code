import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    backgroundImgContainer: {flex: 1},
    errorAlertContainer: {flex: 1, padding: 12},
    firstAlertBoxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    threatHeaderTextStyle: {
      fontFamily: 'Inter-Regular',
      color: '#fff',
      fontSize: 16,
      lineHeight: 22,
    },
    rightIndicatorImgStyle: {width: 6, height: 10, marginLeft: 5},
    activeHeaderTextContainer: {
      fontFamily: 'Inter-Regular',
      color: '#000',
      fontSize: 16,
      lineHeight: 22,
    },
    subTextStyle: {
      fontFamily: 'Oswald-Light',
      fontSize: 32,
      letterSpacing: 1.28,
      color: '#fff',
    },
    subText2Style: {
      fontFamily: 'Oswald-Light',
      fontSize: 32,
      letterSpacing: 1.28,
      color: '#000',
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
