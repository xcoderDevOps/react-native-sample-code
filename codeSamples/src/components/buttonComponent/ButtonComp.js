import {Pressable, Text, Image} from 'react-native';
import React from 'react';
import images from '../../constants/images';
import useStyles from './ButtonCompStyle';
import {useTheme} from '@react-navigation/native';

const ButtonComp = ({
  label,
  onPress,
  disabled,
  customStyle,
  icon,
  isCheckBox,
  isAnonymous,
}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  return (
    <>
      {isAnonymous ? (
        <Pressable
          style={({pressed}) => [
            styles.buttonContainerStyle,
            {
              shadowColor: isAnonymous && colors.black30,
              backgroundColor: disabled
                ? colors.black40
                : pressed
                ? colors.black40
                : colors.black60,
              justifyContent: icon ? 'space-between' : 'center',
            },
            customStyle,
          ]}
          onPress={onPress}>
          <Text style={styles.labelStyle}>{label}</Text>
          {icon && (
            <Image
              source={images.anonymously}
              style={styles.iconStyle}
              resizeMode={'contain'}
            />
          )}
        </Pressable>
      ) : (
        <Pressable
          style={({pressed}) => [
            styles.buttonContainerStyle,
            {
              backgroundColor: disabled
                ? colors.disabledRed
                : pressed
                ? colors.redplusone
                : colors.red,
              justifyContent: icon ? 'space-between' : 'center',
            },
            customStyle,
          ]}
          onPress={onPress}
          disabled={disabled}>
          <Text style={styles.labelStyle}>{label}</Text>
          {icon && (
            <Image
              source={images.rightArrow}
              style={styles.iconStyle}
              resizeMode={'contain'}
            />
          )}
        </Pressable>
      )}
    </>
  );
};

export default ButtonComp;
