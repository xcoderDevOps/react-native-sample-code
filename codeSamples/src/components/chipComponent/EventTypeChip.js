import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import useStyles from './EventTypeChipStyle';
import {Chip} from 'react-native-paper';
import {dimens} from '../../constants/dimens';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {strings} from '../../constants/Strings';

const EventTypeChip = ({onClose}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const [selectedChip, setSelectedChip] = useState(null);

  const handleChipPress = chip => {
    setSelectedChip(chip);
  };

  const CustomChip = ({label, onPress, selected}) => {
    return (
      <TouchableOpacity
        style={[styles.chip, selected && styles.selectedChip]}
        onPress={onPress}>
        <View style={styles.selectedEventStyle}>
          {selected && <Icon name="check" size={20} color={colors.infoblue} />}
          <Text
            style={{
              color: selected ? colors.infoblue : colors.black,
              marginLeft: dimens.w2,
            }}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.radiusTextStyle}>{strings.event_type}</Text>
      <View style={styles.sliderContainer}>
        <View style={styles.chipContainer}>
          <CustomChip
            label={strings.crime}
            onPress={() => handleChipPress(strings.crime)}
            selected={selectedChip === strings.crime}
          />

          <CustomChip
            label={strings.incident}
            onPress={() => handleChipPress(strings.incident)}
            selected={selectedChip === strings.incident}
          />
          {/* <Chip
            selectedColor="#1BA2E8"
            mode="outlined"
            selected={selectedChip === 'Crime'}
            onPress={() => handleChipPress('Crime')}
            style={[
              selectedChip === 'Crime' ? styles.selectedChip : styles.chip,
              {borderRadius: 40},
            ]}>
            <View
              style={[
                styles.chipTextContainer,
                // {paddingLeft: selectedChip ? 0 : 20},
                {width: selectedChip ? -dimens.w3 : dimens.w27},
              ]}>
              <Text style={{textAlign: 'center'}}>Crime</Text>
            </View>
          </Chip>

          <Chip
            selectedColor="#1BA2E8"
            mode="outlined"
            selected={selectedChip === 'Incident'}
            onPress={() => handleChipPress('Incident')}
            style={[
              selectedChip === 'Incident' ? styles.selectedChip : styles.chip,
              {borderRadius: 40},
            ]}>
            <View
              style={[
                styles.chipTextContainer,
                // {paddingLeft: selectedChip ? 0 : 20},
                {width: selectedChip ? -dimens.w3 : dimens.w30},
              ]}>
              <Text style={{textAlign: 'center'}}>Incident</Text>
            </View>
          </Chip> */}
        </View>
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

export default EventTypeChip;
