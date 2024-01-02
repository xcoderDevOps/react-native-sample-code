import {StyleSheet, Platform} from 'react-native';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import {dimens, fontsizes} from '../../constants/dimens';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    parentContainerStyle: {flex: 1},
    headerContainerStyle: {
      flex: 0.13,
      backgroundColor: props.colors.white,
      justifyContent: 'flex-end',
    },
    scrollViewStyle: {flex: 1, backgroundColor: props.colors.white},
    accordionStyle: {
      backgroundColor: props.colors.white,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: props.colors.black20,
      height: dimens.h6_5,
      paddingTop: dimens.h0_5,
    },
    scrollviewContainer: {
      // flex: 2,
      backgroundColor: props.colors.white,
      padding: dimens.h2_5,
    },
    imageIconStyle: {width: dimens.w4_5, height: dimens.h3},
    titleStyle: {
      right: dimens.w3_5,
      color: props.colors.black60,
      fontFamily: font.SubtitleNButton_Inter_Semi_Bold,
      fontSize: fontsizes.FONT_16_PX,
    },
    prefixStyle: {width: dimens.w6, height: dimens.w6},
    datePickerStyle: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 4,
      paddingTop: 0,
    },
    closeStyle: {width: dimens.w6, height: dimens.h3},
    subTitleStyle: {marginTop: 4, color: props.colors.lightGray},
    spacingContainer: {marginTop: 20},
    currentLocationContainer: {marginTop: 1},
    dividerStyle: {
      width: '100%',
      flexDirection: 'row',
      marginTop: dimens.h3,
      alignItems: 'center',
    },
    dividerLeftPart: {
      width: '45%',
      height: 1,
      backgroundColor: props.colors.singleLine,
      marginRight: 10,
    },
    dividerRightPart: {
      width: '45%',
      height: 1,
      backgroundColor: props.colors.singleLine,
      marginLeft: 10,
    },
    descriptionBoxStyle: {
      borderWidth: 1,
      borderColor: props.colors.black20,
      borderRadius: 8,
      padding: Platform.OS === 'ios' ? 12 : 14,
      minHeight: dimens.h12,
      textAlignVertical: 'top',
      paddingTop: dimens.h1_5,
      fontSize: fontsizes.FONT_16_PX,
      // lineHeight: 44,
      letterSpacing: -0.32,
      color: props.colors.black,
    },
    crimeDescriptionBoxStyle: {
      borderWidth: 1,
      borderColor: props.colors.black20,
      borderRadius: 8,
      height: dimens.h5,
      fontSize: fontsizes.FONT_16_PX,
      color: props.colors.black,
      marginTop: dimens.h1_2,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: dimens.w4,
      paddingRight: 6,
      flexDirection: 'row',
    },
    descriptionTitleStyle: {
      color: props.colors.black60,
      fontFamily: font.SubtitleNButton_Inter_Semi_Bold,
      fontSize: fontsizes.FONT_16_PX,
    },
    descriptionSpacingContainer: {marginTop: 24},
    attachmentTextStyle: {
      color: props.colors.black30,
      fontSize: fontsizes.FONT_16_PX,
      fontFamily: font.Body1_Inter_Regular,
    },
    attachmentIconStyle: {width: dimens.w6, height: dimens.h4},
    submitButtonStyle: {marginTop: dimens.h4_3, width: '100%'},
    selectedLocationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
      justifyContent: 'space-between',
    },
    addressContainer: {
      borderWidth: 1,
      width: '90%',
      padding: 15,
      borderRadius: 8,
      borderColor: props.colors.black20,
    },
    pinStyle: {width: 17, height: 36},
    mediaListContainer: {
      borderWidth: 1,
      height: 40,
      width: 160,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 5,
      paddingRight: 5,
      paddingVertical: 5,
      borderRadius: 8,
      marginRight: 5,
      borderColor: props.colors.infoblue,
    },
    mediaTextStyle: {
      width: 100,
      fontFamily: font.Body1_Inter_Regular,
      color: props.colors.infoblue,
      fontSize: fontsizes.FONT_16_PX,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
