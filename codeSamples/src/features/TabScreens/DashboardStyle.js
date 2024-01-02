import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    parentContainer: {flex: 1, backgroundColor: props.colors.white},
    headerContainer: {
      flex: Platform.OS === 'ios' ? 0.17 : 0.1,
      backgroundColor: props.colors.white,
      marginTop: Platform.OS === 'ios' ? 0 : dimens.h3,
      justifyContent: 'center',
    },
    dashboardViewContainer: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: Platform.OS === 'ios' ? 1 : 20,
    },
    scrollViewContainer: {paddingBottom: 20},
    mainContainer: {flex: 1},
    eventBtnContainer: {
      height: 40,
      borderRadius: 8,
      backgroundColor: props.colors.black10,
      marginTop: 5,
    },
    rowContainer: {
      flex: 1,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 15,
      paddingRight: 15,
    },
    googlePlaceContainer: {paddingLeft: 15, paddingRight: 15},
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
