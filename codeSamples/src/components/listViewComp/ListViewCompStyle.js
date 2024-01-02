import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/font';

const getStyles = props =>
  StyleSheet.create({
    parentContainer: {padding: 40},
    headerContainer: {
      flex: 1,
      backgroundColor: props.colors.white,
      marginTop: dimens.h2_5,
    },
    middleComponent: {flex: 3.5},
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
      height: Platform.OS === 'ios' ? dimens.h4_5 : dimens.h5_3,
      width: dimens.w30,
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
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.17,
      shadowRadius: 3.05,
      elevation: 4,
    },

    bottomSheerMainContainer: {flex: 1, backgroundColor: props.colors.white},
    flatListContainer: {paddingLeft: 10},
    bottomSheetContainer: {
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
    },
    draggableIconContainer: {
      backgroundColor: 'transparent',
    },
    renderFlatlistContainer: {
      borderWidth: StyleSheet.hairlineWidth,
      marginHorizontal: dimens.w1,
      alignSelf: 'center',
      borderRadius: 36,
      borderColor: props.colors.black20,
      padding: 4,
    },
    eventTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: dimens.w2_5,
      justifyContent: 'space-between',
    },
    eventTextStyle: {color: props.colors.black},
    mainWrapContainer: {marginTop: 8},
    wrapContainer: {
      borderWidth: 1,
      // width: 350,
      borderRadius: 8,
      borderColor: '#D8D8D8',
      minHeight: 180,
    },
    titleViewStyle: {marginLeft: dimens.w4, marginTop: dimens.w4},
    titleTextStyle: {
      color: props.colors.black60,
      fontSize: fontsizes.FONT_16_PX,
      fontFamily: font.SubtitleNButton_Inter_Semi_Bold,
    },
    subTextViewStyle: {
      marginTop: 8,
      marginLeft: dimens.w4,
      marginTop: dimens.w4,
    },
    subTextRowViewStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    subTextStyle: {
      color: props.colors.black40,
      fontFamily: font.Body2_Inter_Regular,
      fontSize: fontsizes.FONT_14_PX,
    },
    severityImgStyle: {width: dimens.w4, height: dimens.w4},
    scrollviewContainer: {marginTop: dimens.h2},
    mediaButtonContainer: {
      paddingHorizontal: dimens.w2_5,
    },
    thumbnailVideoImage: {
      width: dimens.w20,
      height: dimens.h9_2,
      borderRadius: 4,
    },
    thumbnailImage: {width: dimens.w20, height: dimens.h9_2, borderRadius: 4},
    bottomManageView: {height: 16},
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
