import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: props.colors.white,
      marginTop: dimens.h3_5,
      width: dimens.w90,
      height: dimens.h20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: props.colors.black20,
      alignSelf: 'center',
      padding: 1.5,
    },
    container: {flex: 1, flexDirection: 'row'},
    leftContainer: {flex: 1, backgroundColor: props.colors.white},
    totalEventContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: dimens.w5,
    },
    noEventTextStyle: {
      fontSize: fontsizes.FONT_32_PX,
      fontFamily: font.Heading1_Oswald_Light,
      color: props.colors.black,
      letterSpacing: 1.28,
    },
    totalEventTextStyle: {
      fontSize: fontsizes.FONT_14_PX,
      fontFamily: font.Body1_Inter_Regular,
      color: props.colors.black40,
    },
    crimeIncidentContainer: {flex: 1, paddingLeft: dimens.w3, top: dimens.h1_2},
    noCrimeTextStyle: {
      backgroundColor: props.colors.white,
      flexDirection: 'row',
      // borderWidth: 1,
      alignItems: 'center',
    },
    crimeNumberStyle: {
      fontSize: fontsizes.FONT_16_PX,
      fontFamily: font.SubtitleNButton_Inter_Semi_Bold,
      color: props.colors.black,
    },
    crimeTextStyle: {color: props.colors.black40},
    incidentContainer: {
      backgroundColor: props.colors.white,
      flexDirection: 'row',
      // borderWidth: 1,
      alignItems: 'center',
    },
    incidentNumberStyle: {
      fontSize: fontsizes.FONT_16_PX,
      fontFamily: font.SubtitleNButton_Inter_Semi_Bold,
      color: props.colors.black,
    },
    rightContainer: {
      flex: 1,
      backgroundColor: props.colors.white,
      alignItems: 'center',
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
