import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextInputComp from '../../components/inputComponet/TextInputComp';
import ButtonComp from '../../components/buttonComponent/ButtonComp';
import {strings} from '../../constants/Strings';
import useStyles from './SignInStyle';
import LinearGradientComp from '../../components/LinearGradientComponent/LinearGradientComp';
import {
  checkWhiteSpace,
  isEmail,
  isValidPassword8cahrOnly,
} from '../../utilities/helperFunction';
import {useTheme, CommonActions} from '@react-navigation/native';
import {commonStackIdentifier} from '../../../App';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearState,
  signInAction,
  signInUpdateEmail,
  signInUpdateEmailError,
  signInUpdatePassword,
  signInUpdatePasswordError,
} from '../../commonSlices/signInSlice';
import * as AsyncStore from '../../asyncstorage/index';
import _ from 'lodash';
import ProgressIndicator from '../../components/ProgressIndicator';
import SuccessOrErrorModal from '../../components/SuccessOrErrorModal';

const SignIn = ({props}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const signInDataSelector = useSelector(state => state.signInSliceReducer);
  // const signUpDataSelector = useSelector(state => state.signUpSliceReducer);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [emailErrorText, setEmailErrorText] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [passwordShow, setPasswordShow] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const MAX_PASSWORD_LENGTH = 16;

  useEffect(() => {
    if (signInDataSelector.sininResponse.status) {
      AsyncStore.storeJsonData(
        AsyncStore.Keys.USER_DATA,
        signInDataSelector.sininResponse.data,
      );
      AsyncStore.storeJsonData(
        AsyncStore.Keys.ACCESS_TOKEN,
        signInDataSelector.sininResponse.data.token,
      );
      AsyncStore.storeJsonData(AsyncStore.Keys.SIGN_UP_STEP, '2');
      Keyboard.dismiss();
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
      // props.navigation.replace(commonStackIdentifier.drawer_navigatore, {
      //   screen: commonStackIdentifier.tab_navigator,
      // });
      dispatch(clearState());
    } else {
      if (
        !_.isEmpty(signInDataSelector?.sininResponse) &&
        !signInDataSelector.sininResponse.status
      ) {
        setShowSuccessModal(true);
      }
    }
  }, [signInDataSelector.sininResponse]);

  const isButtonDisabled = () => {
    return (
      !signInDataSelector?.userEmail ||
      !signInDataSelector?.userPassword ||
      signInDataSelector?.emailError ||
      signInDataSelector?.passwordError
    );
  };

  // console.log('signUpDataSelector----', signUpDataSelector);
  // console.log('signInDataSelector----', signInDataSelector);

  const textEmailChange = email => {
    setEmail(email);
    dispatch(signInUpdateEmail(email));
    if (email?.length !== 0) {
      // setEmailErrorText(isEmail(email) ? '' : strings.invalid_email_format);
      dispatch(
        signInUpdateEmailError(
          isEmail(email) ? '' : strings.invalid_email_format,
        ),
      );
    } else {
      setEmailErrorText('');
      dispatch(signInUpdateEmailError(''));
    }
  };

  const textPassChange = pass => {
    setPassword(pass);
    let filteredText = checkWhiteSpace(pass);
    const truncatedText = filteredText.slice(0, MAX_PASSWORD_LENGTH);
    dispatch(signInUpdatePassword(truncatedText));
    if (pass?.length !== 0) {
      // setPasswordErrorText(isValidPassword(pass) ? '' : strings.incorrectInfo);
      dispatch(
        signInUpdatePasswordError(
          isValidPassword8cahrOnly(pass) ? '' : strings.incorrectInfo,
        ),
      );
    } else {
      setPasswordErrorText('');
      dispatch(signInUpdatePasswordError(''));
    }
  };

  const handleSignupButton = () => {
    Keyboard.dismiss();
    if (passwordErrorText.length !== 0) {
      return;
    } else {
      const body = {
        email: signInDataSelector?.userEmail,
        password: signInDataSelector?.userPassword,
      };
      dispatch(signInAction(body));
      // props.navigation.navigate(commonStackIdentifier.drawer_navigatore, {
      //   screen: commonStackIdentifier.tab_navigator,
      // });
    }
  };

  const handleAnonymousSignIn = () => {
    Keyboard.dismiss();
    props.navigation.navigate(commonStackIdentifier.anonymous_screen);
  };

  const handleOnSinupPress = () => {
    Keyboard.dismiss();
    props.navigation.navigate(commonStackIdentifier.signup_screen);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      keyboardVerticalOffset={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {showSuccessModal && (
        <SuccessOrErrorModal
          isModalVisible={showSuccessModal}
          toggleModal={() => {
            dispatch(clearState());
            setShowSuccessModal(false);
          }}
          buttonTitle={strings.password_error}
          isError={true}
          subText={signInDataSelector?.sininResponse?.message}
        />
      )}
      <LinearGradientComp>
        <View style={styles.headerContainer}>
          {/* ------- Top Component Contains screen name --------- */}
          <View style={styles.headerTextContainer}>
            <View style={styles.signUpTextContainer}>
              <Text style={styles.signUpTextStyle}>{strings.sign_in}</Text>
              <Text style={styles.signUpText2Style}>
                {strings.login_details}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.middleContainerStyle}>
          {/* -------- Middle Component Contains screen details ----------- */}
          <View style={styles.middleParentContainer}>
            <TextInputComp
              label={strings.email_address}
              onChangeText={email => textEmailChange(email)}
              value={signInDataSelector?.userEmail}
              emailErrorText={signInDataSelector?.emailError}
              error={emailError || (email && !isEmail(email) ? null : null)}
              keyboardType="email-address"
            />
            {email?.length !== 0 ? (
              // <Text style={styles.emailErrorStyle}> {emailErrorText}</Text>
              <ErrorComponent errorText={signInDataSelector?.emailError} />
            ) : null}

            <TextInputComp
              label="Password"
              onChangeText={pass => textPassChange(pass)}
              value={signInDataSelector?.userPassword}
              passwordErrorText={signInDataSelector?.passwordError}
              error={passwordError}
              // error={
              //   passwordError ||
              //   (password && !isValidPassword(password)
              //     ? 'Password must be at least 8 characters'
              //     : null)
              // }
              handleShowPassword={() => setPasswordShow(!passwordShow)}
              passwordBtn={true}
              showPassword={passwordShow ? false : true}
              secureTextEntry={passwordShow ? true : false}
              keyboardType="default"
            />
            {password?.length !== 0 ? (
              // <Text style={styles.emailErrorStyle}> {passwordErrorText}</Text>
              <ErrorComponent errorText={signInDataSelector?.passwordError} />
            ) : null}

            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate(
                  commonStackIdentifier.forgot_password,
                );
              }}>
              <Text style={styles.forgetPassText}> {'Forgot Password?'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ------------ End Component Contains screen Control ------------- */}
        <View style={styles.endContainerStyle}>
          <View style={styles.endButtonContainer}>
            <ButtonComp
              disabled={isButtonDisabled() ? true : isDisabled}
              icon="arrowright"
              label={strings.sign_in}
              onPress={() => handleSignupButton()}
            />
            <View style={styles.middleOrComponent}>
              <View style={styles.leftLineStyle} />
              <Text style={styles.orTextStyle}> or </Text>
              <View style={styles.rightLineStyle} />
            </View>

            <ButtonComp
              isAnonymous={true}
              // isCheckBox={isCheckBox}
              // disabled={isButtonDisabled() ? true : isDisabled}
              icon="head"
              label={strings.sign_in_anonymously}
              onPress={() => handleAnonymousSignIn()}
            />

            <TouchableOpacity
              style={styles.endSignInStyle}
              onPress={() => {
                handleOnSinupPress();
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
        </View>
      </LinearGradientComp>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
