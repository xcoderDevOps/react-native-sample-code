import {StyleSheet, Platform} from 'react-native';


import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../constants/font';
import { dimens, fontsizes } from '../constants/dimens';


const getStyles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: dimens.h2,
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    itemContainer: {
      flex: 1,
      padding: dimens.h1,
      alignItems: 'center',
    },
    itemText: {
      fontFamily: font.Body1_Inter_Regular,
      fontSize: fontsizes.FONT_12_PX,
      color: props.colors.black50,
      includeFontPadding: false,
    },
    titleText: {
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontSize:
        Platform.OS === 'ios' ? fontsizes.FONT_24_PX : fontsizes.FONT_24_PX,
      color: props.colors.black50,
      includeFontPadding: false,
      alignSelf: 'center',
      marginTop: dimens.h4,
    },
    gradStyles: {
      borderRadius: dimens.h10,
      width: dimens.w87_3,
      height: dimens.h5_7,
    },

    titleStylebtn: {
      color: props.colors.black50,
      fontSize: fontsizes.FONT_24_PX,
      fontFamily: font.Body1_Inter_Regular,
    },
    containerBtn: {
      flex: 1,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
