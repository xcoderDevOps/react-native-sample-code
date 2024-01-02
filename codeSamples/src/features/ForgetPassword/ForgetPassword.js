import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextInputComp from '../../components/inputComponet/TextInputComp';
import ButtonComp from '../../components/buttonComponent/ButtonComp';
import {strings} from '../../constants/Strings';
import {Checkbox} from 'react-native-paper';
import useStyles from './ForgetPasswordStyle';
import LinearGradientComp from '../../components/LinearGradientComponent/LinearGradientComp';
import {commonStackIdentifier} from '../../../App';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {dimens} from '../../constants/dimens';
import {useTheme} from '@react-navigation/native';
import EnterOtpModal from '../../components/inputComponet/EnterOtpModal';
import {useDispatch, useSelector} from 'react-redux';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import {isEmail} from '../../utilities/helperFunction';
import {
  clearState,
  forgotPassword,
  updateEmail,
  verifyOtp,
} from '../../commonSlices/forgotPassword.slice';
import _ from 'lodash';
import SuccessOrErrorModal from '../../components/SuccessOrErrorModal';
import ProgressIndicator from '../../components/ProgressIndicator';
import {updateEmailReset} from '../../commonSlices/resetPasswordSlice';
const ForgetPassword = ({props}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const selector = useSelector(state => state.forgotPasswordSliceReducer);
  const dispatch = useDispatch();
  const [isEnterOtpVisible, setIsEnterOtpVisible] = useState(false);
  const [isShowError, setIsShowError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // for forgot password API call
  useEffect(() => {
    if (selector.forgotPasswordResponse.status) {
      setIsEnterOtpVisible(true);
    } else {
      if (
        !_.isEmpty(selector.forgotPasswordResponse) &&
        !selector.forgotPasswordResponse.status
      ) {
        setShowSuccessModal(true);
      }
    }
  }, [selector.forgotPasswordResponse]);

  // for verify otp API call
  useEffect(() => {
    if (selector.verifyOtp_response.status) {
      dispatch(updateEmailReset(selector.email));
      props.navigation.replace(commonStackIdentifier.reset_password);
      dispatch(clearState());
    } else {
      if (
        !_.isEmpty(selector.verifyOtp_response) &&
        !selector.verifyOtp_response.status
      ) {
        setShowErrorModal(true);
      }
    }
  }, [selector.verifyOtp_response]);

  const onSubmitCalled = () => {
    setIsEnterOtpVisible(!isEnterOtpVisible);
    props.navigation.navigate(commonStackIdentifier.reset_password);
  };

  const isValidEmail = email => {
    isEmail(email) ? setIsShowError(false) : setIsShowError(true);
  };
  const isButtonDisabled = () => {
    return !selector?.email || isShowError;
  };

  const handleOnSendOtpClick = () => {
    console.log('manth');
    const body = {
      email: selector?.email,
    };
    dispatch(forgotPassword(body));
  };

  const handleOnVerifyOtp = () => {
    const body = {
      email: selector?.email,
      otp: selector.otp,
    };
    dispatch(verifyOtp(body));
    setIsEnterOtpVisible(!isEnterOtpVisible);
  };
  return (
    <>
      <EnterOtpModal
        isModalVisible={isEnterOtpVisible}
        toggleModal={() => {
          // onSubmitCalled();
          handleOnVerifyOtp();
        }}
      />
      {showSuccessModal && (
        <SuccessOrErrorModal
          isModalVisible={showSuccessModal}
          toggleModal={() => {
            // dispatch(clearState());
            setShowSuccessModal(false);
          }}
          buttonTitle={strings.try_again}
          isError={true}
          subText={selector.forgotPasswordResponse?.message}
        />
      )}
      {showErrorModal && (
        <SuccessOrErrorModal
          isModalVisible={showErrorModal}
          toggleModal={() => {
            dispatch(clearState());
            setShowErrorModal(false);
          }}
          buttonTitle={strings.password_error}
          isError={true}
          subText={selector.verifyOtp_response.message}
        />
      )}
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        keyboardVerticalOffset={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* <EnterOtpModal
        isModalVisible={isEnterOtpVisible}
        toggleModal={() => {
          setIsEnterOtpVisible(!isEnterOtpVisible);
        }}
      /> */}
        <LinearGradientComp>
          <View style={styles.headerContainer}>
            {/* ------- Top Component Contains screen name --------- */}
            <View style={styles.headerTextContainer}>
              <View style={styles.signUpTextContainer}>
                <Pressable
                  onPress={() => {
                    props.navigation.goBack();
                  }}>
                  <AntDesign
                    name="arrowleft"
                    size={dimens.w6}
                    color={colors.white}
                    style={{width: dimens.w6, height: dimens.h3}}
                  />
                </Pressable>
                <Text style={styles.signUpTextStyle}>
                  {strings.forrgotten_password}
                </Text>
                <Text style={styles.signUpText2Style}>
                  {strings.forrgotten_password_des}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.middleContainerStyle}>
            {/* -------- Middle Component Contains screen details ----------- */}
            <View style={{marginTop: 25}}>
              <TextInputComp
                label={strings.email_address}
                // placeholder="Enter your email"
                onChangeText={email => {
                  dispatch(updateEmail(email));
                  isValidEmail(email);
                }}
                value={selector.email}
                passwordErrorText={isShowError}
                keyboardType="email-address"
              />
              {selector.email.length !== 0 && isShowError ? (
                <ErrorComponent errorText={strings.invalid_email_format} />
              ) : null}
            </View>
          </View>

          {/* ------------ End Component Contains screen Control ------------- */}
          <View style={styles.endContainerStyle}>
            <ButtonComp
              disabled={isButtonDisabled()}
              icon={selector.loading ? '' : 'arrowright'}
              label={
                selector.loading ? (
                  <ProgressIndicator size={'small'} color={colors.white} />
                ) : (
                  strings.sendOtp
                )
              }
              onPress={() => {
                handleOnSendOtpClick();
                // setIsEnterOtpVisible(true);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate(commonStackIdentifier.signup_screen);
              }}>
              <Text style={styles.haveAnAccTextStyle}>
                {strings.new_here}
                <Text style={styles.haveAnAccSignInText}>
                  {' '}
                  {strings.sign_up}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradientComp>
      </KeyboardAvoidingView>
    </>
  );
};

export default ForgetPassword;
