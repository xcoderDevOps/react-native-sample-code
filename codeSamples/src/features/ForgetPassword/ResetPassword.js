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
import {
  isValidConfirmPassword,
  isValidPassword8cahrOnly,
} from '../../utilities/helperFunction';
import SuccessOrErrorModal from '../../components/SuccessOrErrorModal';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {
  clearState,
  resetPassword,
  updateConfirmPass,
  updateNewPassword,
} from '../../commonSlices/resetPasswordSlice';
import ProgressIndicator from '../../components/ProgressIndicator';

const ResetPassword = ({props}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const selector = useSelector(state => state.resetPasswordSliceReducer);
  const dispatch = useDispatch();

  const [passwordError, setPasswordError] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordErrorConfirm, setPasswordErrorConfirm] = useState('');

  const [passwordShowConfirm, setPasswordShowConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setConfirmIsPasswordValid] = useState(false);

  useEffect(() => {
    if (selector.resetPasswordRespons.status) {
      setShowSuccessModal(true);
    } else {
      if (
        !_.isEmpty(selector.resetPasswordRespons) &&
        !selector.resetPasswordRespons.status
      ) {
      }
    }
  }, [selector.resetPasswordRespons]);

  const onSuccessClicked = () => {
    setShowSuccessModal(!showSuccessModal);
    dispatch(clearState());
    props.navigation.navigate(commonStackIdentifier.signin_screen);
  };
  const textPassChange = pass => {
    // setPassword(pass);
    setPasswordError('');
    setIsPasswordValid(false);
  };
  const textPassChangeConfirm = pass => {
    // setPasswordConfirm(pass);
    setPasswordErrorConfirm('');

    setConfirmIsPasswordValid(false);
  };

  const onResetPasswordClick = () => {
    if (
      _.isEmpty(selector.newPassword) ||
      !isValidPassword8cahrOnly(selector.newPassword)
    ) {
      setPasswordError(strings.password_error);
      setIsPasswordValid(true);
      // dispatch(updatePasswordIsError(true));

      return;
    }
    if (
      _.isEmpty(selector.confirmPassword) ||
      !isValidConfirmPassword(selector.newPassword, selector.confirmPassword)
    ) {
      // dispatch(updateConPasswordIsError(true));
      setPasswordErrorConfirm(strings.confirm_pass);
      setConfirmIsPasswordValid(true);
      return;
    }
    const body = {
      email: selector.emailUsers,
      password: selector.newPassword,
      confirm_password: selector.confirmPassword,
    };
    
    dispatch(resetPassword(body));
  };

  return (
    <>
      <SuccessOrErrorModal
        isModalVisible={showSuccessModal}
        toggleModal={() => {
          onSuccessClicked();
        }}
        subText={selector.resetPasswordRespons.message}
        buttonTitle={strings.sign_in}
      />
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
                <Text style={styles.signUpTextStyle}>{strings.reset_pass}</Text>
                <Text style={styles.signUpText2Style}>
                  {strings.reset_pass_des}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.middleContainerStyle}>
            {/* -------- Middle Component Contains screen details ----------- */}
            <View style={{marginTop: 25}}>
              <View style={{}}>
                <TextInputComp
                  label="New Password"
                  onChangeText={pass => {
                    textPassChange(pass);
                    dispatch(updateNewPassword(pass));
                  }}
                  value={selector.newPassword}
                  // error={
                  //   passwordError ||
                  //   (password && !isValidPassword8cahrOnly(password)
                  //     ? 'Password must be at least 8 characters'
                  //     : null)
                  // }
                  handleShowPassword={() => setPasswordShow(!passwordShow)}
                  passwordBtn={true}
                  showPassword={passwordShow}
                  secureTextEntry={passwordShow ? false : true}
                  keyboardType="default"
                  passwordErrorText={isPasswordValid}
                />

                {selector.newPassword?.length !== 0 && isPasswordValid ? (
                  <ErrorComponent errorText={passwordError} />
                ) : null}
              </View>

              <TextInputComp
                label="Confirm Password"
                onChangeText={pass => {
                  textPassChangeConfirm(pass);
                  dispatch(updateConfirmPass(pass));
                }}
                value={selector.confirmPassword}
                // error={
                //   passwordErrorConfirm ||
                //   (passwordConfirm && !isValidPassword8cahrOnly(passwordConfirm)
                //     ? 'Password must be at least 8 characters'
                //     : null)
                // }
                handleShowPassword={() =>
                  setPasswordShowConfirm(!passwordShowConfirm)
                }
                passwordBtn={true}
                showPassword={passwordShowConfirm}
                secureTextEntry={passwordShowConfirm ? false : true}
                keyboardType="default"
                passwordErrorText={isConfirmPasswordValid}
              />

              {selector.confirmPassword?.length !== 0 &&
              isConfirmPasswordValid ? (
                <ErrorComponent errorText={passwordErrorConfirm} />
              ) : null}
            </View>
          </View>

          {/* ------------ End Component Contains screen Control ------------- */}
          <View style={styles.endContainerStyle}>
            <ButtonComp
              // disabled={isButtonDisabled()}
              icon={selector.loading ? '' : 'arrowright'}
              label={
                selector.loading ? (
                  <ProgressIndicator size={'small'} color={colors.white} />
                ) : (
                  strings.reset_pass
                )
              }
              // label={strings.reset_pass}
              onPress={() => {
                // setShowSuccessModal(true);
                onResetPasswordClick();
              }}
            />
            <TouchableOpacity
              onPress={() => {
                dispatch(clearState());
                props.navigation.navigate(commonStackIdentifier.signup_screen);
              }}>
              <Text style={styles.haveAnAccTextStyle}>
                {strings.new_here}
                <Text style={{color: '#DA1A35'}}> {strings.sign_up}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradientComp>
      </KeyboardAvoidingView>
    </>
  );
};

export default ResetPassword;
