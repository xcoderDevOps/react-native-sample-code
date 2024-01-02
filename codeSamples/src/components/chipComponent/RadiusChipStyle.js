import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    container: {
      // flex: 1,
      // borderWidth: 1,
      paddingHorizontal: 20,
    },
    sliderContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 10,
    },
    slider: {
      width: '100%',
      // marginTop: 30,
    },
    textContainer: {
      // position: 'absolute',
      top: 1,
      borderWidth: StyleSheet.hairlineWidth,
      alignSelf: 'flex-start',
      marginLeft: -10,
      borderRadius: 20,
      paddingLeft: 10,
      paddingRight: 10,
      padding: 3,
      alignItems: 'center',
    },
    radiusTextStyle: {
      // paddingHorizontal: 20,
      fontFamily: font.PlaceHolder_overline_Inter_Semi_Bold,
      fontSize: 16,
    },
    text: {
      fontSize: 16,
      textAlign: 'center',
      color: '#121212',
      fontFamily: font.Body1_Inter_Regular,
    },
    bottomContainer: {
      // flex: 1,
      margin: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    bottomRightContainer: {
      flexDirection: 'row',
      width: dimens.w30,
      justifyContent: 'space-between',
    },
    resetTextStyle: {
      fontSize: fontsizes.FONT_16_PX,
      color: props.colors.infoblue,
      fontFamily: font.SubtitleNButton_Inter_Semi_Bold,
    },
    cancelTextStyle: {
      fontSize: fontsizes.FONT_16_PX,
      color: props.colors.black40,
      fontFamily: font.SubtitleNButton_Inter_Semi_Bold,
    },
    applyTextStyle: {
      fontSize: fontsizes.FONT_16_PX,
      color: props.colors.infoblue,
      fontFamily: font.SubtitleNButton_Inter_Semi_Bold,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
