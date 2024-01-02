import {
  View,
  Text,
  Image,
  Keyboard,
  Animated,
  InputAccessoryView,
  Pressable,
  Button,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import useStyles from './ComentViewTextInputViewStyles';
import CommonStyles from '../CommonStyles';
import { useTheme } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import images from '../../constants/images';
import { strings } from '../../constants/Strings';
import font from '../../constants/font';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { dimens } from '../../constants/dimens';
const ComentViewListCompcopy = () => {
  const commonStyles = CommonStyles();
  const styles = useStyles();
  const { colors } = useTheme();
  const [commentText, setCommentText] = useState('');
  const [inputHeight, setInputHeight] = useState(50);
  //   const [keyboardHeight, setKeyboardHeight] = useState(new Animated.Value(0));
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  let isKeyboardVisible = false;
  const inputRef = React.useRef();
  const inputAccessoryViewID = 'keyboard_cus_codesamples';

  return (
    <View style={{ justifyContent: 'center', flex: 1, backgroundColor: 'red' }}>
      <View style={styles.commentTextInputContainer}>
        <Image
          source={images.samplePeopleImage}
          style={styles.imageStyl}
          resizeMode='contain'
        />
        <TextInput
          ref={inputRef}
          inputAccessoryViewID={inputAccessoryViewID}
          style={[
            {
              height: 50,
              flex: 1,
              color: colors.black30,
              textAlign: 'auto',
              backgroundColor: colors.white,
            },
            commonStyles.body1,
          ]}
          mode='flat'
          multiline
          allowFontScaling={false}
          value={commentText}
          textColor={colors.black60}
          placeholder={strings.addAComment}
          placeholderTextColor={colors.textInputTextColor}
          keyboardType={'email-address'}
          // selectionColor={colors.black}
          // underlineColorAndroid={colors.separatorColor}
          underlineColor={'transparent'}
          onChangeText={(text) => {
            setCommentText(text);
          }}
          spellCheck={false}
          autoCapitalize='none'
          theme={{
            colors: {
              primary: colors.black30,
              underlineColor: 'transparent',
            },
          }}
          activeUnderlineColor={'transparent'}
          //   onContentSizeChange={e =>
          //     handleContentSizeChange(
          //       e.nativeEvent.contentSize.width,
          //       e.nativeEvent.contentSize.height,
          //     )
          //   }
          numberOfLines={5}
          // onPressIn={onPressIn}
          // onFocus={onPressIn}
          // onEndEditing={onEndEditing}
          // onPressOut={onPressOut}
          onBlur={() => {
            setIsKeyboardOpen(false);
            Keyboard.dismiss();
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: colors.black20,
          width: dimens.w92,
          height: dimens.ho1,
          alignSelf: 'center',
          marginTop: dimens.ho3,
        }}
      />
    </View>
  );
};

export default ComentViewListCompcopy;
