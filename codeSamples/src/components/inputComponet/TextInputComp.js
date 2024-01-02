import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, HelperText} from 'react-native-paper';
import useStyles from './TextInputCompStyle';
import {useTheme} from '@react-navigation/native';

const TextInputComp = ({
  handleShowPassword,
  showPassword,
  passwordBtn,
  label,
  placeholder,
  onChangeText,
  secureTextEntry,
  keyboardType,
  customStyle,
  value,
  error,
  passwordErrorText,
  emailErrorText,
  errorMsg,
  disabled,
}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const [focusInput, setFocusInput] = useState(false);
  const [borderColor, setBorderColor] = useState(null);
  // console.log(emailErrorText);
  useEffect(() => {
    if (emailErrorText || passwordErrorText) {
      setBorderColor('red');
    } else if (focusInput) {
      setBorderColor(colors.black60);
    } else {
      setBorderColor(colors.black20);
    }
  }, [focusInput, emailErrorText, passwordErrorText]);

  const onInputFocus = () => {
    setFocusInput(true);
  };

  const onInputBlur = () => {
    setFocusInput(false);
  };

  return (
    <View style={{}}>
      <TextInput
        disabled={disabled}
        onFocus={() => onInputFocus()}
        onBlur={() => onInputBlur()}
        mode="outlined"
        // label={label}
        error={error}
        contentStyle={styles.contentContainerStyle}
        style={[styles.inputMainContainerStyle, customStyle]}
        label={
          <>
            <Text style={styles.labelStyle}>{label}</Text>
          </>
        }
        theme={styles.themePrimaryColor}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={"none"}
        // {error ? (
        //   <HelperText
        //     type="error"
        //     visible={true}
        //     padding={'none'}
        //     style={{color: colors.red}}>
        //     {errorMsg}
        //   </HelperText>
        // ) : null}
        right={
          passwordBtn && (
            <TextInput.Icon
              onPress={handleShowPassword}
              icon={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={24}
              style={{top: 4}}
              color={'#969696'}
            />
          )
        }
        outlineStyle={[
          styles.inputOutlineStyle,
          {
            borderColor: borderColor,
            borderWidth: 1,
          },
        ]}
      />
    </View>
  );
};

export default TextInputComp;
