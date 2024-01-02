import {StyleSheet, Platform} from 'react-native';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import {fontsizes} from '../../constants/dimens';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    keyboardContainer: {flex: 1, backgroundColor: props.colors.white},
    headerContainer: {flex: 1, justifyContent: 'flex-end'},
    headerTextContainer: {flex: 0.6, justifyContent: 'flex-end'},
    signUpTextContainer: {marginBottom: 20, marginLeft: 20},
    signUpTextStyle: {
      fontSize: fontsizes.FONT_32_PX,
      fontFamily: font.Heading1_Oswald_Light,
      color: props.colors.white,
      textTransform: 'uppercase',
      lineHeight: 44,
      letterSpacing: 1.28,
    },
    signUpText2Style: {
      fontSize: fontsizes.FONT_16_PX,
      fontFamily: font.Body1_Inter_Regular,
      color: props.colors.white,
      lineHeight: 22,
    },
    middleContainerStyle: {
      flex: 3,
      backgroundColor: props.colors.white,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
    },
    disclaimerTextStyle: {
      color: props.colors.black40,
      alignSelf: 'flex-end',
      top: 3,
      fontFamily: font.Body2_Inter_Regular,
      fontSize: 14,
    },
    endContainerStyle: {flex: 0.6, backgroundColor: props.colors.white},
    haveAnAccTextStyle: {
      textAlign: 'center',
      marginVertical: 20,
      color: props.colors.black60,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
