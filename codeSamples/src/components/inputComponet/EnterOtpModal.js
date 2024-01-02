import React, {useState, useEffect, useRef} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';

import useStyles from './EnterOtpModalStyle';

import ButtonComp from '../buttonComponent/ButtonComp';
import {dimens} from '../../constants/dimens';
import {strings} from '../../constants/Strings';
import images from '../../constants/images';
import OTPTextInput from 'react-native-otp-textinput';
import {useDispatch, useSelector} from 'react-redux';
import {updateOtp} from '../../commonSlices/forgotPassword.slice';

function EnterOtpModal({isModalVisible, toggleModal}) {
  const styles = useStyles();
  const {colors} = useTheme();
  const otpRef = useRef(null);
  const dispatch = useDispatch();
  const selector = useSelector(state => state.forgotPasswordSliceReducer);
  const isButtonDisabled = () => {
    return selector.otp.length < 6 ? true : false;
  };

  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.modalStyle}
      // animationIn={'fadeIn'}
      // animationOut={'fadeOut'}
      // backdropColor="transparent"
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}>
      {/* <BlurView
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}
        blurAmount={0.7}
        blurType="dark"
      /> */}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled
        //   keyboardVerticalOffset={100}
      >
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                backgroundColor: '#fff',
                height: dimens.h40,
                width: dimens.w90,
                padding: 20,
                borderRadius: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Image
                resizeMode="center"
                source={images.ic_gmail}
                style={{
                  resizeMode: 'center',
                  position: 'absolute',

                  top: -dimens.h10,
                }}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: dimens.h4,
                }}>
                <Text style={styles.titleText}>{strings.otp_sent}</Text>
                <Text style={styles.desText}>{strings.otp_sent_des}</Text>
              </View>
              <OTPTextInput
                inputCount={6}
                ref={otpRef}
                // tintColor={colors.deepmagenta}
                // tintColor={colors.deepcyan}
                tintColor={colors.black}
                offTintColor={colors.black}
                textInputStyle={{
                  borderBottomWidth: 1,
                  borderRadius: 8,
                  borderWidth: 1,
                  height: dimens.h6,
                  width: dimens.w10,
                  // fontSize: fontsizes.FONT_14Px_H6,
                  // fontFamily: font.Proximanovaexcn_Regular,
                  color: colors.black,
                }}
                selectionColor="white"
                containerStyle={{}}
                handleTextChange={text => {
                  dispatch(updateOtp(text));
                }}
                keyboardType="default"
              />
              <View>
                <ButtonComp
                  disabled={isButtonDisabled()}
                  label={strings.submit}
                  onPress={toggleModal}
                  customStyle={{width: dimens.w80}}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default EnterOtpModal;
