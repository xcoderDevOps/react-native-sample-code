import {
  View,
  Text,
  Image,
  Keyboard,
  Animated,
  InputAccessoryView,
  Pressable,
} from 'react-native';
import React, {useState, useEffect, useImperativeHandle} from 'react';
import useStyles from './ComentViewTextInputViewStyles';
import CommonStyles from '../CommonStyles';
import {useTheme} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import images from '../../constants/images';
import {strings} from '../../constants/Strings';
import font from '../../constants/font';
import {dimens} from '../../constants/dimens';
import Feather from 'react-native-vector-icons/Feather';
import {EventRegister} from 'react-native-event-listeners';
const ComentViewTextInputView = ({
  onSubmit,
  onTextChanges,
  isAutoFocus = false,
  ref,
}) => {
  const commonStyles = CommonStyles();
  const styles = useStyles();
  const {colors} = useTheme();
  const [commentText, setCommentText] = useState('');
  const [inputHeight, setInputHeight] = useState(50);
  //   const [keyboardHeight, setKeyboardHeight] = useState(new Animated.Value(0));
  const inputRef = React.useRef();

  useEffect(() => {
    EventRegister.addEventListener('focusTextinput', item => {
      inputRef.current.focus();
    });
    return () => {
      EventRegister.removeAllListeners();
    };
  }, []);

  return (
    <>
      {/* <InputAccessoryView nativeID={inputAccessoryViewID}> */}
      <View style={styles.container}>
        <View style={styles.commentTextInputContainer}>
          <Image
            source={images.samplePeopleImage}
            style={styles.imageStyl}
            resizeMode="contain"
          />
          <TextInput
            autoFocus={isAutoFocus}
            ref={inputRef}
            editable={true}
            // inputAccessoryViewID={inputAccessoryViewID}
            style={[styles.textInput, commonStyles.body1]}
            mode="flat"
            multiline={true}
            maxLength={100}
            numberOfLines={1}
            allowFontScaling={false}
            value={commentText}
            textColor={colors.black60}
            placeholder={strings.addAComment}
            placeholderTextColor={colors.black30}
            keyboardType={'email-address'}
            // selectionColor={colors.black}
            // underlineColorAndroid={colors.separatorColor}
            underlineColor={'transparent'}
            onChangeText={text => {
              setCommentText(text);
              onTextChanges(text);
            }}
            spellCheck={false}
            autoCapitalize="none"
            theme={{
              colors: {
                primary: colors.black30,
                underlineColor: 'transparent',
              },
            }}
            activeUnderlineColor={'transparent'}
          />
          <Pressable
            onPress={onSubmit}
            style={({pressed}) => [
              {
                backgroundColor: pressed
                  ? colors.locationblue
                  : colors.infoblue,
                width: dimens.h5,
                height: dimens.h5,
                borderRadius: dimens.h2_5,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Feather name={'send'} size={20} color={colors.white} />
          </Pressable>
        </View>
        <View style={styles.viewSaperator} />
      </View>
      {/* </InputAccessoryView> */}
    </>
  );
};

export default ComentViewTextInputView;
