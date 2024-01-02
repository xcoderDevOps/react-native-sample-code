import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import useStyles from './SeverityLevelChipStyle';
import {Chip} from 'react-native-paper';
import {dimens} from '../../constants/dimens';
import Icon from 'react-native-vector-icons/Entypo';
import {useTheme} from '@react-navigation/native';
import {strings} from '../../constants/Strings';
import {useDispatch, useSelector} from 'react-redux';
import {setSeverityLevel} from '../../commonSlices/severityLevelSlice';

const SeverityLevelChip = ({onClose, showTitle, showButtons}) => {
  const dispatch = useDispatch();
  const getSeverityLevel = useSelector(
    state => state.severityLevelSliceReducer,
  );
  // getSeverityLevel?.selectSeverityLevel
  const styles = useStyles();
  const {colors} = useTheme();
  const [selectedChip, setSelectedChip] = useState(null);

  const handleChipPress = chip => {
    setSelectedChip(chip);
    dispatch(setSeverityLevel(chip));
  };

  const CustomChip = ({label, onPress, selected}) => {
    return (
      <TouchableOpacity
        style={[styles.chip, selected && styles.selectedChip]}
        onPress={onPress}>
        <View style={styles.selectedSeverity}>
          <View style={styles.innerSelectedSeverity}>
            <Icon
              name="dot-single"
              style={{marginRight: 15}}
              size={60}
              color={
                label == 'Low'
                  ? colors.badgeYellow
                  : label == 'Medium'
                  ? colors.warningorange
                  : label == 'High'
                  ? colors.red
                  : null
              }
            />
            <Text
              style={{
                color: selected ? colors.infoblue : colors.black,
                right: dimens.w7,
              }}>
              {label}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {showTitle && (
        <Text style={styles.radiusTextStyle}>{strings.severity_level}</Text>
      )}

      <View style={styles.sliderContainer}>
        <View style={styles.chipContainer}>
          <CustomChip
            label="Low"
            onPress={() => handleChipPress('Low')}
            selected={getSeverityLevel?.selectSeverityLevel === 'Low'}
          />

          <CustomChip
            label="Medium"
            onPress={() => handleChipPress('Medium')}
            selected={getSeverityLevel?.selectSeverityLevel === 'Medium'}
          />

          <CustomChip
            label="High"
            onPress={() => handleChipPress('High')}
            selected={getSeverityLevel?.selectSeverityLevel === 'High'}
          />
        </View>
      </View>

      {showButtons && (
        <View style={styles.bottomContainer}>
          <View>
            <TouchableOpacity onPress={() => setSelectedChip(null)}>
              <Text style={styles.resetTextStyle}>{strings.reset}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomRightContainer}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelTextStyle}>{strings.cancel}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.applyTextStyle}>{strings.apply}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default SeverityLevelChip;
