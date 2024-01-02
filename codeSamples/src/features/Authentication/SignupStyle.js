import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    keyboardContainer: {flex: 1, backgroundColor: props.colors.white},
    headerContainer: {flex: 0.9, justifyContent: 'flex-end'},
    headerTextContainer: {flex: 0.6, justifyContent: 'flex-end'},
    signUpTextContainer: {marginBottom: dimens.h2, marginLeft: dimens.h2},
    signUpTextStyle: {
      fontSize: fontsizes.FONT_32_PX,
      fontFamily: font.Heading1_Oswald_Light,
      color: props.colors.white,
      textTransform: 'uppercase',
    },
    signUpText2Style: {
      fontSize: fontsizes.FONT_16_PX,
      fontFamily: font.Body1_Inter_Regular,
      color: props.colors.white,
    },
    middleParentContainer: {marginTop: dimens.h2_5},
    middleContainerStyle: {
      flex: 2.4,
      backgroundColor: props.colors.white,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
    },
    disclaimerTextStyle: {
      color: props.colors.black40,
      alignSelf: 'flex-end',
      top: 3,
      fontFamily: font.Body2_Inter_Regular,
      fontSize: fontsizes.FONT_14_PX,
    },
    endContainerStyle: {flex: 0.8, backgroundColor: props.colors.white},
    haveAnAccTextStyle: {
      textAlign: 'center',
      marginVertical: dimens.h2,
      color: props.colors.black60,
      fontFamily: font.Body1_Inter_Regular,
      fontSize: fontsizes.FONT_16_PX,
    },
    haveAnAccSignInText: {color: props.colors.red},
    checkBoxContainer: {
      flexDirection: 'row',
      marginLeft: dimens.w7,
      marginRight: dimens.w7,
      bottom: dimens.h2_5,
      backgroundColor: props.colors.white,
    },
    termsConditionTextStyle: {color: props.colors.black60},
    checkBoxErrorStyle: {
      color: props.colors.red,
      textAlign: 'center',
      bottom: dimens.h1_5,
    },
    emailErrorStyle: {color: props.colors.red, textAlign: 'center'},
    singUpInfoContainer: {paddingLeft: dimens.w8, bottom: dimens.h0_5},
    infoBulletStyle: {fontSize: 18, color: props.colors.infoblue},
    infoTextStyle: {fontSize: fontsizes.FONT_14_PX},
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
