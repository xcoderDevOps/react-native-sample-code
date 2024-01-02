import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import React from 'react';
import images from '../../../constants/images';
import useStyles from './ThreadAlertCompStyle';

const ThreadAlertComp = ({
  onPress,
  icon,
  header,
  subText,
  customStyle,
  showArrow = true,
}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity onPress={onPress} style={customStyle}>
      <ImageBackground
        resizeMode="cover"
        style={styles.backgroundImgContainer}
        source={icon}>
        <View style={styles.errorAlertContainer}>
          {showArrow && (
            <View style={styles.firstAlertBoxContainer}>
              <Text style={styles.threatHeaderTextStyle}>{header}</Text>
              <Image
                style={styles.rightIndicatorImgStyle}
                source={images.rightIndicator}
              />
            </View>
          )}
          {!showArrow && (
            <Text style={styles.activeHeaderTextContainer}>{header}</Text>
          )}
          {showArrow && <Text style={styles.subTextStyle}>{subText}</Text>}
          {!showArrow && <Text style={styles.subText2Style}>{subText}</Text>}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ThreadAlertComp;

const styles = StyleSheet.create({});
