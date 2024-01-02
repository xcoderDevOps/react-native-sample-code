import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextInputComp from '../../components/inputComponet/TextInputComp';
import ButtonComp from '../../components/buttonComponent/ButtonComp';
import {strings} from '../../constants/Strings';
import {Checkbox} from 'react-native-paper';
import useStyles from './SignupStyle';
import LinearGradientComp from '../../components/LinearGradientComponent/LinearGradientComp';
import {
  checkWhiteSpace,
  isEmail,
  isValidPassword8cahrOnly,
} from '../../utilities/helperFunction';
import {useTheme, CommonActions} from '@react-navigation/native';
import {commonStackIdentifier} from '../../../App';
import BluredPrivacyMattersModel from '../../components/BluredPrivacyMattersModel';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearState,
  updateEmail,
  updateEmailError,
  updateFullName,
  updatePassword,
  updatePasswordError,
  signUpAction,
} from '../../commonSlices/signUpSlice';
import PasswordInfo from '../../components/PasswordInformation/PasswordInfo';
import SuccessOrErrorModal from '../../components/SuccessOrErrorModal';
import * as AsyncStore from '../../asyncstorage/index';
import _ from 'lodash';
import ProgressIndicator from '../../components/ProgressIndicator';
import CommonStyles from '../CommonStyles';
const Signup = ({props}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const commonStyles = CommonStyles();
  const dispatch = useDispatch();
  const signUpDataSelector = useSelector(state => state.signUpSliceReducer);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [emailErrorText, setEmailErrorText] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isCheckBox, setIsCheckBox] = useState('unchecked');
  const [checkBoxColor, setCheckBoxColor] = useState(false);
  const [passwordShow, setPasswordShow] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const MAX_PASSWORD_LENGTH = 16;

  useEffect(() => {
    setTimeout(() => {
      setModalVisible(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (signUpDataSelector?.signupResponse?.status) {
      AsyncStore.storeJsonData(
        AsyncStore.Keys.USER_DATA,
        signUpDataSelector.signupResponse.data,
      );
      AsyncStore.storeJsonData(
        AsyncStore.Keys.ACCESS_TOKEN,
        signUpDataSelector.signupResponse.data.token,
      );
      AsyncStore.storeJsonData(AsyncStore.Keys.SIGN_UP_STEP, '2');
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: commonStackIdentifier.drawer_navigatore,
            },
          ],
        }),
      );
      // props.navigation.replace(commonStackIdentifier.drawer_navigatore);
      dispatch(clearState());
      setIsCheckBox('unchecked');
    } else {
      if (
        !_.isEmpty(signUpDataSelector?.signupResponse) &&
        !signUpDataSelector?.signupResponse?.status
      ) {
        setShowSuccessModal(true);
      }
    }
  }, [signUpDataSelector.signupResponse]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const isButtonDisabled = () => {
    return (
      !signUpDataSelector?.fullName ||
      !signUpDataSelector?.userEmail ||
      !signUpDataSelector?.userPassword ||
      signUpDataSelector?.emailError ||
      signUpDataSelector?.passwordError
    );
  };

  // console.log('signUpDataSelector----', signUpDataSelector);

  const handleNameChange = text => {
    // setFullName(text);
    dispatch(updateFullName(text));
  };

  const handleEmailChange = email => {
    // setEmail(email);
    let filteredText = checkWhiteSpace(email);
    dispatch(updateEmail(filteredText));
    if (email?.length !== 0) {
      // setEmailErrorText(isEmail(email) ? '' : strings.invalid_email_format);
      dispatch(
        updateEmailError(isEmail(email) ? '' : strings.invalid_email_format),
      );
    } else {
      setEmailErrorText('');
      dispatch(updateEmailError(''));
    }
  };

  const handlePasswordChange = pass => {
    // setPassword(pass);
    let filteredText = checkWhiteSpace(pass);
    const truncatedText = filteredText.slice(0, MAX_PASSWORD_LENGTH);
    dispatch(updatePassword(truncatedText));

    if (pass?.length !== 0) {
      // setPasswordErrorText(
      //   isValidPassword(pass) ? '' : strings.password_validation_text,
      // );
      dispatch(
        updatePasswordError(
          isValidPassword8cahrOnly(pass) ? '' : strings.password_validation_text,
        ),
      );
    } else {
      setPasswordErrorText('');
      dispatch(updatePasswordError(''));
    }
  };

  const handleSignupButton = () => {
    if (isCheckBox == 'unchecked') {
      setCheckBoxColor(true);
    } else if (passwordErrorText.length !== 0) {
      return;
    } else {
      const body = {
        name: signUpDataSelector?.fullName,
        email: signUpDataSelector.userEmail,
        password: signUpDataSelector.userPassword,
        terms_conditions: 1,
      };

      dispatch(signUpAction(body));
      // props.navigation.navigate(commonStackIdentifier.signin_screen);
      // dispatch(clearState());
      // setIsCheckBox('unchecked');
    }
  };

  // console.log('emailErrorText-------', email.length);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      keyboardVerticalOffset={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
        showHideTransition={true}
      />
      <BluredPrivacyMattersModel
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      />
      {showSuccessModal && (
        <SuccessOrErrorModal
          isModalVisible={showSuccessModal}
          toggleModal={() => {
            dispatch(clearState());
            setIsCheckBox('unchecked');
            setShowSuccessModal(false);
          }}
          buttonTitle={strings.password_error}
          isError={true}
          subText={signUpDataSelector?.signupResponse?.message}
        />
      )}
      <LinearGradientComp>
        <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
          <View style={styles.headerContainer}>
            {/* ------- Top Component Contains screen name --------- */}
            <View style={styles.headerTextContainer}>
              <View style={styles.signUpTextContainer}>
                <Text style={styles.signUpTextStyle}>{strings.sign_up}</Text>
                <Text style={styles.signUpText2Style}>
                  {strings.safer_community}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.middleContainerStyle}>
            {/* -------- Middle Component Contains screen details ----------- */}
            <View style={styles.middleParentContainer}>
              <TextInputComp
                label="Full Name"
                onChangeText={text => handleNameChange(text)}
                value={signUpDataSelector?.fullName}
                keyboardType="default"
              />

              <TextInputComp
                label="Email Address"
                onChangeText={email => handleEmailChange(email)}
                value={signUpDataSelector?.userEmail}
                errorMsg={
                  emailError ||
                  (email && !isEmail(email) ? 'Invalid Email' : null)
                }
                emailErrorText={signUpDataSelector?.emailError}
                error={emailError || (email && !isEmail(email) ? null : null)}
                keyboardType="email-address"
              />
              {signUpDataSelector?.userEmail?.length !== 0 ? (
                <ErrorComponent errorText={signUpDataSelector?.emailError} />
              ) : null}

              <TextInputComp
                label="Password"
                onChangeText={pass => handlePasswordChange(pass)}
                value={signUpDataSelector?.userPassword}
                passwordErrorText={signUpDataSelector?.passwordError}
                error={passwordError}
                //  ||
                //   (password && !isValidPassword(password)
                //   ? strings.password_validation_text
                //   : null)
                handleShowPassword={() => setPasswordShow(!passwordShow)}
                passwordBtn={true}
                showPassword={passwordShow ? false : true}
                secureTextEntry={passwordShow ? true : false}
                keyboardType="default"
              />
              {/* {password?.length !== 0 ? (
              <Text style={styles.emailErrorStyle}> {passwordErrorText}</Text>
            ) : null} */}

              {/*PasswordInfo ---- this is information to enter pass or rule  */}
              {/* <PasswordInfo /> */}
            </View>
          </View>

          {/* ------------ End Component Contains screen Control ------------- */}
          <View style={styles.endContainerStyle}>
            <View style={styles.checkBoxContainer}>
              <Checkbox.Android
                onPress={() => {
                  Keyboard.dismiss();
                  if (isCheckBox == 'checked') {
                    setIsCheckBox('unchecked');
                  } else {
                    setIsCheckBox('checked');
                    setCheckBoxColor(false);
                  }
                }}
                color={colors.black60}
                // label="Item"
                status={isCheckBox}
              />
              <Text style={[commonStyles.body2, {color: colors.black40}]}>
                {strings.terms_condition_text}
                <Text style={[commonStyles.body2, {color: colors.black}]}>
                  {' '}
                  {'Terms & Conditions.'}
                </Text>
              </Text>
              {/* <Text style={styles.disclaimerTextStyle}>
                {strings.terms_condition_text}
                <Text style={styles.termsConditionTextStyle}>
                  {' '}
                  {'Terms & Conditions.'}
                </Text>
              </Text> */}
            </View>
            {checkBoxColor && (
              <Text style={styles.checkBoxErrorStyle}>
                {' '}
                {strings.terms_conditions_error_text}
              </Text>
            )}
            <ButtonComp
              isCheckBox={isCheckBox}
              disabled={isButtonDisabled() ? true : isDisabled}
              icon={signUpDataSelector.loading ? '' : 'arrowright'}
              label={
                signUpDataSelector.loading ? (
                  <ProgressIndicator size={'small'} color={colors.white} />
                ) : (
                  strings.sign_up
                )
              }
              onPress={() => handleSignupButton()}
            />
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate(commonStackIdentifier.signin_screen);
              }}>
              <Text style={styles.haveAnAccTextStyle}>
                {strings.have_an_account}
                <Text style={styles.haveAnAccSignInText}>
                  {' '}
                  {strings.sign_in}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </LinearGradientComp>
    </KeyboardAvoidingView>
  );
};

export default Signup;
