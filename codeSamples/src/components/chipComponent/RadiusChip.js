import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Slider from '@react-native-community/slider';
import useStyles from './RadiusChipStyle';
import {strings} from '../../constants/Strings';
import {useTheme} from '@react-navigation/native';

const RadiusChip = ({onClose}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const [sliderValue, setSliderValue] = useState(0);

  const onSliderValueChange = value => {
    setSliderValue(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.radiusTextStyle}>{strings.radius}</Text>
      <View style={styles.sliderContainer}>
        {/* <Text style={styles.text}>Slider Value: {sliderValue}</Text> */}
        <View
          style={[
            styles.textContainer,
            {left: `${(sliderValue / 150) * 130}%`},
          ]}>
          <Text style={styles.text}>{sliderValue} mi</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={sliderValue}
          onValueChange={onSliderValueChange}
          step={1}
          thumbTintColor={colors.infoblue}
          minimumTrackTintColor={colors.infoblue}
          maximumTrackTintColor={colors.lightBlue}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View>
          <TouchableOpacity>
            <Text style={styles.resetTextStyle}>{strings.reset}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomRightContainer}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelTextStyle}>{strings.cancel}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.applyTextStyle}>{strings.apply}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RadiusChip;
