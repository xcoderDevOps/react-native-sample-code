import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../utilities/ResponsiveScreen.js';

import {Dimensions, PixelRatio} from 'react-native';

const fontScale = PixelRatio.getFontScale();
/**
 *  w1 = percentage respect to the width of 100%
 *  h1 = percentage respect to the height of 100%
 */
export const dimens = {
  horizontalMargin: wp('6%'),
  verticalMargin: wp('6%'),
  horizontalMarginLogin: wp('8%'),

  wo1: wp('0.2%'),
  wo4: wp('0.3%'),
  wo5: wp('0.5%'),
  wo8: wp('0.8%'),
  w1: wp('1%'),
  w1_2: wp('1.2%'),
  w1_5: wp('1.5%'),
  w2: wp('2%'),
  w2_5: wp('2.5%'),
  w3: wp('3%'),
  w3_5: wp('3.5%'),
  w4: wp('4%'),
  w4_5: wp('4.5%'),
  w5: wp('5%'),
  w5_5: wp('5.5%'),
  w6: wp('6%'),
  w7: wp('7%'),
  w8: wp('8%'),
  w9: wp('9%'),
  w10: wp('10%'),
  w11: wp('11%'),
  w11_2: wp('11.2%'),
  w11_4: wp('11.4%'),
  w12: wp('12%'),
  w13: wp('13%'),
  w14: wp('14%'),
  w15: wp('15%'),
  w10_: wp('10'),
  w12_: wp('12'),
  w16: wp('16%'),
  w17: wp('17%'),
  w18: wp('18%'),
  w19: wp('19%'),
  w20: wp('20%'),
  w21: wp('21%'),
  w21_5: wp('21.5%'),
  w22: wp('22%'),
  w22_2: wp('22.2%'),
  w23: wp('23%'),
  w23_5: wp('23.5%'),
  w24: wp('24%'),
  w24_5: wp('24.5%'),
  w25: wp('25%'),
  w26: wp('26%'),
  w27: wp('27%'),
  w28: wp('28%'),
  w29: wp('29%'),
  w30: wp('30%'),
  w30_1: wp('30'),
  w31: wp('31%'),
  w32: wp('32%'),
  w35: wp('35%'),
  w35_5: wp('35.5%'),
  w34: wp('34%'),
  w34_5: wp('34.5%'),
  w36: wp('36%'),
  w38: wp('38%'),
  w39: wp('39%'),
  w39_5: wp('39.9%'),
  w40: wp('40%'),
  w41_4: wp('41.4%'),
  w43: wp('43%'),
  w44: wp('44%'),
  w45: wp('45%'),
  w48: wp('48%'),
  w50: wp('50%'),
  w52: wp('52%'),
  w53: wp('53%'),
  w55: wp('55%'),
  w57_5: wp('57.7%'),
  w58: wp('58%'),
  w60: wp('60%'),
  w60_1: wp('61.5%'),
  w62: wp('62%'),
  w65: wp('65%'),
  w68: wp('68%'),
  w70: wp('70%'),
  w71: wp('71%'),
  w72: wp('72%'),
  w75: wp('75%'),
  w74: wp('74%'),
  w76: wp('76%'),
  w78: wp('78%'),

  w79: wp('79%'),
  w80: wp('80%'),
  w82: wp('82%'),
  w84: wp('84%'),
  w85: wp('85%'),
  w86: wp('86%'),
  w86_1: wp('86.5%'),
  w87_3: wp('87.3%'),

  w88: wp('88%'),
  w89: wp('89%'),
  w89_2: wp('89.2%'),
  w89_5: wp('89.5%'),
  w89_6: wp('89.6%'),
  w90: wp('90%'),
  w92: wp('92%'),
  w94: wp('94%'),
  w96: wp('96%'),
  w100: wp('100%'),
  w120: wp('120%'),
  w130: wp('130%'),
  w150: wp('150%'),
  w200: wp('200%'),
  w205: wp('205%'),
  w210: wp('210%'),

  /// Height
  ho1: hp('0.1%'),
  ho2: hp('0.2%'),
  ho3: hp('0.3%'),
  ho5: hp('0.5%'),
  h0_5: hp('0.8%'),
  h1: hp('1%'),
  h1_2: hp('1.2%'),
  h1_25: hp('1.25%'),
  h1_5: hp('1.5%'),
  h1_8: hp('1.8%'),
  h2: hp('2%'),
  h2_3: hp('2.3%'),
  h2_5: hp('2.5%'),
  h2_8: hp('2.8%'),
  h3: hp('3%'),
  h3_5: hp('3.5%'),
  h4: hp('4%'),
  h4_3: hp('4.3%'),
  h4_5: hp('4.5%'),
  h4_8: hp('4.8%'),
  h5: hp('5%'),
  h5_2: hp('5.20%'),
  h5_3: hp('5.30%'),
  h5_4: hp('5.4%'),
  h5_5: hp('5.5%'),
  h5_6: hp('5.6%'),
  h5_7: hp('5.7%'),
  h6: hp('6%'),
  h6_5: hp('6.5%'),
  h7: hp('7%'),
  h7_7: hp('7.7%'),
  h8: hp('8.8%'),
  h9: hp('9%'),
  h9_2: hp('9.2%'),
  h9_5: hp('9.5%'),
  h10: hp('10%'),
  h10_2: hp('10.2%'),
  h10_3: hp('10.3%'),
  h10_4: hp('10.4%'),
  h11: hp('11%'),
  h12: hp('12%'),
  h12_2: hp('12.2%'),
  h13: hp('13%'),
  h14: hp('14%'),
  h14_9: hp('14.8%'),
  h15: hp('15%'),
  h16: hp('16.9%'),
  h17: hp('17%'),
  h18: hp('18%'),
  h19: hp('19%'),
  h20: hp('20%'),
  h21: hp('21%'),
  h22: hp('22%'),
  h23: hp('23%'),
  h24: hp('24%'),
  h25: hp('25%'),
  h26: hp('26%'),
  h27: hp('27%'),
  h28: hp('28%'),
  h28_5: hp('28.5%'),

  h30: hp('30%'),
  h32: hp('32%'),
  h34: hp('34%'),
  h34_4: hp('34.4%'),
  h36: hp('36%'),
  h38: hp('38%'),
  h39: hp('39%'),
  h40: hp('40%'),
  h41: hp('41%'),
  h42: hp('42%'),
  h43: hp('43%'),
  h44: hp('44%'),
  h45: hp('45%'),
  h46: hp('46%'),
  h47: hp('47%'),
  h48: hp('48%'),
  h49: hp('49%'),
  h50: hp('50%'),
  h51: hp('51%'),
  h52: hp('52%'),
  h53: hp('53%'),
  h54: hp('54%'),
  h55: hp('55%'),
  h56: hp('56%'),
  h57: hp('57%'),
  h60: hp('60%'),
  h65: hp('65%'),
  h67: hp('67%'),
  h68: hp('68%'),
  h70: hp('70%'),
  h72_5: hp('72.5%'),
  h73: hp('73%'),
  h75: hp('75%'),
  h80: hp('80%'),
  h85: hp('85%'),
  h86: hp('86%'),
  h87: hp('87%'),
  h88: hp('88%'),
  h90: hp('90%'),
  h92: hp('92%'),
  h94: hp('94%'),
  h95: hp('95%'),
  h96: hp('96%'),
  h97: hp('97%'),
  h98: hp('98%'),
  h99: hp('99%'),
  h100: hp('100%'),
  h110: hp('110%'),
  h120: hp('120%'),
  h130: hp('130%'),
};

export const fontsizes = {
  FONT_32_PX:
    Platform.OS == 'ios'
      ? fontScale == 1
        ? 32
        : fontScale >= 1 && fontScale < 1.235
        ? 30
        : fontScale >= 1.235 && fontScale < 1.353
        ? 28
        : fontScale >= 1.353 && fontScale < 1.786
        ? 26
        : fontScale >= 1.786 && fontScale < 2.643
        ? 24
        : fontScale >= 2.643 && fontScale < 3.143
        ? 22
        : fontScale >= 3.143 && fontScale <= 3.571
        ? 20
        : 32
      : fontScale == 1
      ? 32
      : fontScale >= 1 && fontScale <= 1.15
      ? 30
      : fontScale >= 1.15 && fontScale <= 1.3
      ? 29
      : fontScale >= 1.3 && fontScale <= 1.6
      ? 28
      : fontScale >= 1.6 && fontScale <= 2
      ? 27
      : 32,

  FONT_24_PX:
    Platform.OS == 'ios'
      ? fontScale == 1
        ? 24
        : fontScale >= 1 && fontScale < 1.235
        ? 22
        : fontScale >= 1.235 && fontScale < 1.353
        ? 20
        : fontScale >= 1.353 && fontScale < 1.786
        ? 18
        : fontScale >= 1.786 && fontScale < 2.643
        ? 16
        : fontScale >= 2.643 && fontScale < 3.143
        ? 14
        : fontScale >= 3.143 && fontScale <= 3.571
        ? 12
        : 24
      : fontScale == 1
      ? 24
      : fontScale >= 1 && fontScale <= 1.15
      ? 22
      : fontScale >= 1.15 && fontScale <= 1.3
      ? 20
      : fontScale >= 1.3 && fontScale <= 1.6
      ? 18
      : fontScale >= 1.6 && fontScale <= 2
      ? 16
      : 24,

  FONT_16_PX:
    Platform.OS == 'ios'
      ? fontScale == 1
        ? 16
        : fontScale >= 1 && fontScale < 1.235
        ? 15
        : fontScale >= 1.235 && fontScale < 1.353
        ? 14
        : fontScale >= 1.353 && fontScale < 1.786
        ? 13
        : fontScale >= 1.786 && fontScale < 2.643
        ? 12
        : fontScale >= 2.643 && fontScale < 3.143
        ? 11
        : fontScale >= 3.143 && fontScale <= 3.571
        ? 10
        : 16
      : fontScale == 1
      ? 16
      : fontScale >= 1 && fontScale <= 1.15
      ? 15
      : fontScale >= 1.15 && fontScale <= 1.3
      ? 14
      : fontScale >= 1.3 && fontScale <= 1.6
      ? 13
      : fontScale >= 1.6 && fontScale <= 2
      ? 12
      : 16,

  FONT_14_PX:
    Platform.OS == 'ios'
      ? fontScale == 1
        ? 14
        : fontScale >= 1 && fontScale < 1.235
        ? 13
        : fontScale >= 1.235 && fontScale < 1.353
        ? 12
        : fontScale >= 1.353 && fontScale < 1.786
        ? 11
        : fontScale >= 1.786 && fontScale < 2.643
        ? 10
        : fontScale >= 2.643 && fontScale < 3.143
        ? 10
        : fontScale >= 3.143 && fontScale <= 3.571
        ? 10
        : 14
      : fontScale == 1
      ? 14
      : fontScale >= 1 && fontScale <= 1.15
      ? 13
      : fontScale >= 1.15 && fontScale <= 1.3
      ? 12
      : fontScale >= 1.3 && fontScale <= 1.6
      ? 11
      : fontScale >= 1.6 && fontScale <= 2
      ? 10
      : 14,

  FONT_12_PX:
    Platform.OS == 'ios'
      ? fontScale == 1
        ? 12
        : fontScale >= 1 && fontScale < 1.235
        ? 11
        : fontScale >= 1.235 && fontScale < 1.353
        ? 10
        : fontScale >= 1.353 && fontScale < 1.786
        ? 9
        : fontScale >= 1.786 && fontScale < 2.643
        ? 8
        : fontScale >= 2.643 && fontScale < 3.143
        ? 7
        : fontScale >= 3.143 && fontScale <= 3.571
        ? 6
        : 12
      : fontScale == 1
      ? 12
      : fontScale >= 1 && fontScale <= 1.15
      ? 11
      : fontScale >= 1.15 && fontScale <= 1.3
      ? 10
      : fontScale >= 1.3 && fontScale <= 1.6
      ? 10
      : fontScale >= 1.6 && fontScale <= 2
      ? 10
      : 12,
  FONT_11_PX:
    Platform.OS == 'ios'
      ? fontScale == 1
        ? 11
        : fontScale >= 1 && fontScale < 1.235
        ? 10
        : fontScale >= 1.235 && fontScale < 1.353
        ? 9
        : fontScale >= 1.353 && fontScale < 1.786
        ? 8
        : fontScale >= 1.786 && fontScale < 2.643
        ? 7
        : fontScale >= 2.643 && fontScale < 3.143
        ? 6
        : fontScale >= 3.143 && fontScale <= 3.571
        ? 5
        : 11
      : fontScale == 1
      ? 11
      : fontScale >= 1 && fontScale <= 1.15
      ? 10
      : fontScale >= 1.15 && fontScale <= 1.3
      ? 10
      : fontScale >= 1.3 && fontScale <= 1.6
      ? 10
      : fontScale >= 1.6 && fontScale <= 2
      ? 10
      : 11,
};
