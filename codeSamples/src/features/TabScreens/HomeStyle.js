import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    mapViewStyle: {flex: 1},
    parentContainer: {flex: 1, backgroundColor: props.colors.white},
    headerContainer: {
      flex: 1,
      backgroundColor: props.colors.white,
      marginTop: Platform.OS === 'ios' ? 0 : dimens.h3,
    },
    middleComponent: {flex: Platform.OS === 'ios' ? 4 : 5},
    floatingBtnContainer: {
      position: 'absolute',
      bottom: dimens.h2_5,
      left: dimens.w5,
      width: dimens.w90,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    menuBtnContainer: {
      borderRadius: 30,
      height: dimens.h4_5,
      width: dimens.w31,
      justifyContent: 'center',
      backgroundColor: props.colors.infoblue,
    },
    myLocationContainer: {
      backgroundColor: props.colors.white,
      width: dimens.w11,
      height: Platform.OS === 'ios' ? dimens.h5 : dimens.h5_5,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      shadowColor: props.colors.black,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.17,
      shadowRadius: 3.05,
      elevation: 4,
    },
    // google map style
    container: {
      ...StyleSheet.absoluteFillObject,
      // height: dimens.h70,
      // width: dimens.w100,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    listChipContainer: {flex: 1, backgroundColor: props.colors.white},
    rbsheetContainer: {
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    bottomSheetContentStyle: {
      borderTopRightRadius: dimens.h2,
      borderTopLeftRadius: dimens.h2,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
