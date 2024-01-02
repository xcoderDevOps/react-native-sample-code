import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextInputComp from '../../components/inputComponet/TextInputComp';
import ButtonComp from '../../components/buttonComponent/ButtonComp';
import {strings} from '../../constants/Strings';
import useStyles from './AnonymousSignInStyle';
import {
  generateRandomUsername,
  isEmail,
  isValidPassword8cahrOnly,
} from '../../utilities/helperFunction';
import {useTheme, CommonActions} from '@react-navigation/native';
import {commonStackIdentifier} from '../../../App';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearState,
  getrandomUserName,
  signIn_AnonAction,
  signIn_Anon_UpdatePassword,
  signIn_Anon_UpdatePasswordError,
} from '../../commonSlices/signinAnonymouslySlice';
import _ from 'lodash';
import * as AsyncStore from '../../asyncstorage/index';
import ProgressIndicator from '../../components/ProgressIndicator';
import SuccessOrErrorModal from '../../components/SuccessOrErrorModal';

const AnonymousSignIn = ({props}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  const dispatch = useDispatch();
  const signInAnnonSelector = useSelector(
    state => state.signInAnnonSliceReducer,
  );

  const [emailErrorText, setEmailErrorText] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isCheckBox, setIsCheckBox] = useState('unchecked');
  const [checkBoxColor, setCheckBoxColor] = useState(false);
  const [passwordShow, setPasswordShow] = useState(true);
  const [randomUserName, setRandomUserName] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // handleGenerateUsername();
    dispatch(getrandomUserName());
  }, []);

  // for the get api of random user name
  useEffect(() => {
    if (
      !_.isEmpty(signInAnnonSelector.randomUsernamedata) &&
      signInAnnonSelector?.randomUsernamedata?.status
    ) {
      setRandomUserName(signInAnnonSelector?.randomUsernamedata?.data.username);
    }
  }, [signInAnnonSelector.randomUsernamedata]);

  // for post call
  useEffect(() => {
    if (signInAnnonSelector?.sininAnonResponse?.status) {
      AsyncStore.storeJsonData(
        AsyncStore.Keys.USER_DATA,
        signInAnnonSelector?.sininAnonResponse.data,
      );
      AsyncStore.storeJsonData(
        AsyncStore.Keys.ACCESS_TOKEN,
        signInAnnonSelector?.sininAnonResponse.data.token,
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
      // props.navigation.replace(commonStackIdentifier.drawer_navigatore, {
      //   screen: commonStackIdentifier.tab_navigator,
      // });
      dispatch(clearState());
    } else {
      if (
        !_.isEmpty(signInAnnonSelector.sininAnonResponse) &&
        !signInAnnonSelector?.sininAnonResponse?.status
      ) {
        setShowSuccessModal(true);
      }
    }
  }, [signInAnnonSelector.sininAnonResponse]);

  const handleGenerateUsername = () => {
    const randomUsername = generateRandomUsername();
    setRandomUserName(randomUsername);
    console.log(randomUsername);
  };

  const isButtonDisabled = () => {
    return !signInAnnonSelector.userPassword;
  };

  const textNameChange = text => {
    if (text.length < 30) {
      setRandomUserName(text.toString().trim());
    }
  };

  const textPassChange = pass => {
    // setPassword(pass);
    dispatch(signIn_Anon_UpdatePassword(pass));
    // setPasswordErrorText(
    //   isValidPassword(pass) ? '' : strings.password_validation_text,
    // );
    if (pass?.length !== 0) {
      dispatch(signIn_Anon_UpdatePasswordError(true));
      setPasswordErrorText(isValidPassword8cahrOnly(pass) ? '' : strings.incorrectInfo);
    } else {
      setPasswordErrorText('');
    }
  };

  const handleSignInWithEmailButton = () => {
    props.navigation.navigate(commonStackIdentifier.signin_screen);
  };
  const handleSignupPress = () => {
    props.navigation.navigate(commonStackIdentifier.signup_screen);
  };

  const handleAnonymousSignIn = () => {
    const body = {
      username: randomUserName,
      password: signInAnnonSelector.userPassword,
    };
    dispatch(signIn_AnonAction(body));
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      keyboardVerticalOffset={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
        showHideTransition={true}
      />
      {showSuccessModal && (
        <SuccessOrErrorModal
          isModalVisible={showSuccessModal}
          toggleModal={() => {
            dispatch(clearState());
            setShowSuccessModal(false);
          }}
          buttonTitle={strings.password_error}
          isError={true}
          subText={signInAnnonSelector?.sininAnonResponse?.message}
        />
      )}
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <View style={styles.headerContainer}>
          {/* ------- Top Component Contains screen name --------- */}
          <View style={styles.headerTextContainer}>
            <View style={styles.signUpTextContainer}>
              <Text style={styles.signUpTextStyle}>
                {strings.sign_in_anonymously}
              </Text>
              <Text style={styles.signUpText2Style}>
                {strings.random_user_name}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.middleContainerStyle}>
          {/* -------- Middle Component Contains screen details ----------- */}
          <View style={styles.middleParentContainer}>
            <TextInputComp
              disabled={false}
              label={strings.user_name}
              onChangeText={text => textNameChange(text)}
              value={randomUserName}
              keyboardType="default"
            />

            <TextInputComp
              label={strings.password}
              onChangeText={pass => textPassChange(pass)}
              // value={password}
              value={signInAnnonSelector.userPassword}
              passwordErrorText={passwordErrorText}
              // error={
              //   passwordError ||
              //   (password && !isValidPassword(password)
              //     ? 'Password must be at least 8 characters'
              //     : null)
              // }
              error={signInAnnonSelector.signIn_Anon_UpdatePasswordError}
              handleShowPassword={() => setPasswordShow(!passwordShow)}
              passwordBtn={true}
              showPassword={passwordShow ? false : true}
              secureTextEntry={passwordShow ? true : false}
              keyboardType="default"
            />
            {signInAnnonSelector.userPassword !== 0 ? (
              <ErrorComponent errorText={passwordErrorText} />
            ) : null}
          </View>
        </View>

        {/* ------------ End Component Contains screen Control ------------- */}
        <View style={styles.endContainerStyle}>
          <View style={styles.endButtonContainer}>
            <ButtonComp
              isAnonymous={true}
              isCheckBox={isCheckBox}
              disabled={
                isButtonDisabled()
                  ? true
                  : signInAnnonSelector.userPassword?.length < 7
                  ? true
                  : isDisabled
              }
              icon="head"
              label={strings.sign_in_anonymously}
              onPress={() => handleAnonymousSignIn()}
            />
            <View style={styles.middleOrComponent}>
              <View style={styles.leftLineStyle} />
              <Text style={{}}> or </Text>
              <View style={styles.rightLineStyle} />
            </View>

            <ButtonComp
              isCheckBox={isCheckBox}
              // disabled={isButtonDisabled() ? true : isDisabled}
              icon="arrowright"
              label={strings.sign_in_with_email}
              onPress={() => handleSignInWithEmailButton()}
            />

            <TouchableOpacity
              style={styles.endSignInStyle}
              onPress={() => {
                handleSignupPress();
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
      </View>
    </KeyboardAvoidingView>
  );
};

export default AnonymousSignIn;
