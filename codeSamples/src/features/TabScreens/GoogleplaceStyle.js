import {colors} from 'react-native-swiper-flatlist/src/themes';
import {dimens, fontsizes} from '../../constants/dimens';

export const defaultStyle = {
  searchContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    paddingLeft: dimens.w5,
    paddingRight: dimens.w5,
    marginTop: dimens.h1,
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.white,
    height: dimens.h6_5,
    borderRadius: dimens.h1,
    paddingVertical: dimens.h0_5,
    paddingHorizontal: dimens.w3,
    fontSize: fontsizes.FONT_16_PX,
    borderWidth: 1,
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  powered: {},
  listView: {},
  row: {
    backgroundColor: colors.white,
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
};
