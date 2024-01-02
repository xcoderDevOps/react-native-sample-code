import React, {useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../constants/images';
import useStyles from './CustomAlertStyle';
import {useTheme} from '@react-navigation/native';

const CustomAlert = ({
  visible,
  firstMessage,
  secondMessage,
  onClose,
  duration = 3000,
  customStyle,
  heading,
  autoHide = true,
}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  useEffect(() => {
    if (visible && autoHide) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timeoutId);
    }
  }, [visible, onClose, duration, autoHide]);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      // animationType="slide"
      visible={visible}>
      <TouchableOpacity activeOpacity={0.8} style={customStyle}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 1.9, y: 1.0}}
          locations={[0, 0.5]}
          colors={[colors.red, colors.black70]}
          style={styles.alertGradientContainer}>
          <View style={styles.parentContainer}>
            <View style={styles.mainContainer}>
              <View style={styles.rowContainer}>
                <View>
                  {heading && (
                    <Text style={styles.headingTextStyle}>{heading}</Text>
                  )}
                  <Text
                    style={
                      secondMessage
                        ? styles.conditionalStyle
                        : styles.messageTextStyle
                    }>
                    {secondMessage && (
                      <Text style={styles.numberText}>{secondMessage}</Text>
                    )}
                    {firstMessage}
                  </Text>
                </View>
                <Image
                  style={styles.imageStyle}
                  resizeMode="contain"
                  source={images.campaign}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomAlert;
