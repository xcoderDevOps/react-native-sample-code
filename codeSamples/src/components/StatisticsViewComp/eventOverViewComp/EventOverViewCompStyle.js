import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.colors.white,
      marginTop: dimens.h2_3,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: props.colors.black20,
    },
    scrollContent: {
      paddingBottom: dimens.h2, // Adjust as needed
    },
    segmentedButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: dimens.h2,
      marginTop: dimens.h2_5,
      width: dimens.w60,
      marginLeft: dimens.w4,
    },
    segmentButton: {
      padding: dimens.w2,
      // borderColor: '#ccc',
    },
    selectedSegmentButton: {
      borderBottomWidth: 2,
      borderBottomColor: props.colors.red,
    },
    progressBarContainer: {
      paddingLeft: dimens.w5,
    },
    progressBarRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: dimens.h1,
    },
    progressLabel: {
      fontSize: fontsizes.FONT_16_PX,
      // marginBottom: 8,
      top: dimens.h1,
    },
    eventTypeTextStyle: {
      fontSize: fontsizes.FONT_16_PX,
      fontFamily: font.Body1_Inter_Regular,
      lineHeight: 22,
    },
    progressNumber: {
      marginLeft: dimens.w2,
    },
    loadMoreContainer: {
      marginTop: dimens.h2,
    },
    loadMoreButton: {
      marginTop: dimens.h2,
      alignSelf: 'flex-start',
      padding: dimens.w2,
      marginLeft: 20,
    },
    eventOverViewText: {
      paddingLeft: dimens.w5,
      marginTop: dimens.h2_3,
      color: props.colors.black60,
      fontSize: fontsizes.FONT_16_PX,
      fontFamily: font.SubtitleNButton_Inter_Semi_Bold,
    },
    progressBarMainContainer: {
      backgroundColor: props.colors.black10,
      borderWidth: 0,
    },
    loadMoreTextStyle: {
      color: props.colors.infoblue,
      fontFamily: 'Inter-Regular',
      fontSize: 16,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
