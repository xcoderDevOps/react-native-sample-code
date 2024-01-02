import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    commentTextInputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: dimens.w4,
      alignContent: 'center',
    },
    imageStyl: {
      width: dimens.w10,
      height: dimens.w10,
      alignSelf: 'center',
    },
    container: {
      justifyContent: 'center',
      // flex: 1,
      marginVertical: dimens.h2,
      backgroundColor: props.colors.white,
      minHeight: 60,
    },
    textInput: {
      minHeight: 10,
      maxHeight: 100,
      // height: inputHeight,
      flex: 1,
      color: props.colors.black30,
      textAlign: 'auto',
      backgroundColor: props.colors.white,
      includeFontPadding: false,
      // padding: 10,
      // textAlignVertical: 'top',
    },
    viewSaperator: {
      backgroundColor: props.colors.black20,
      width: dimens.w92,
      height: dimens.ho1,
      alignSelf: 'center',
      marginTop: dimens.ho3,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
