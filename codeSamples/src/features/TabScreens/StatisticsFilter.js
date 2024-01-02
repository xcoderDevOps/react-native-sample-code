import {View, Text, SafeAreaView, StatusBar, Pressable} from 'react-native';
import React from 'react';
import CommonStyles from '../CommonStyles';
import useStyles from './StatisticsFilterStyle';
import {useTheme} from '@react-navigation/native';
import HeaderWithText from '../../components/headerComponent/HeaderWithText';
import images from '../../constants/images';
import {strings} from '../../constants/Strings';
import {TextInput, HelperText} from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {dimens} from '../../constants/dimens';
import DatePickerBottomSheet from '../../components/DatePickerBottomSheet';
import moment from 'moment';
import ButtonComp from '../../components/buttonComponent/ButtonComp';
const durationArrary = [
  {
    id: 1,
    name: 'Last 24 hours',
    isSelected: true,
  },
  {
    id: 2,
    name: 'Last 30 days',
    isSelected: false,
  },
  {
    id: 3,
    name: 'Last 365 days',
    isSelected: false,
  },
];
const StatisticsFilter = ({props}) => {
  const commonStyles = CommonStyles();
  const styles = useStyles();
  const {colors} = useTheme();
  const [duration, setDuration] = React.useState(durationArrary);
  const [DatePickerFrom, setDatePickerFrom] = React.useState(false);
  const [DatePickerTo, setDatePickerTo] = React.useState(false);
  const [fromDate, setfromDate] = React.useState(' ');
  const [toDate, setTodate] = React.useState(' ');

  const onItemClick = itemData => {
    let temp = durationArrary.map(item => {
      return item.id === itemData.id
        ? {...item, isSelected: true}
        : {...item, isSelected: false};
    });
    setDuration(temp);
  };

  return (
    <SafeAreaView style={commonStyles.flex_1}>
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />

        <DatePickerBottomSheet
          isHeaderTitle={true}
          headerTitle={'Select Date'}
          visibility={DatePickerFrom}
          onBackdropPress={() => {
            setDatePickerFrom(false);
          }}
          onItemClick={item => {
            console.log('manthnna ', item);
            setDatePickerFrom(false);
            setfromDate(moment(item).format('YYYY-MM-DD').toString());
            // dispatch(updateBirthDate(item));
          }}
          selectedDate={new Date()}
        />

        <DatePickerBottomSheet
          isHeaderTitle={true}
          headerTitle={'Select Date'}
          visibility={DatePickerTo}
          onBackdropPress={() => {
            setDatePickerTo(false);
          }}
          onItemClick={item => {
            console.log('manthnna ', item);
            setTodate(moment(item).format('YYYY-MM-DD').toString());
            setDatePickerTo(false);
            // dispatch(updateBirthDate(item));
          }}
          selectedDate={new Date()}
        />

        <HeaderWithText
          prefixIcon={images.leftArrow}
          prefixStyle={styles.headLeftArrow}
          onPrefixPress={() => {
            props.navigation.goBack();
          }}
          title={strings.statisticsFilter}
          suffixText={strings.reset}
          onSuffixTextPress={() => {}}
        />
        <View
          style={{
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View style={{flex: 1}}>
            {/* select duration section  */}
            <View style={styles.topView}>
              <Text style={commonStyles.subTitlesNbuttons}>
                {strings.filterbyDuration}
              </Text>
              {duration.map(itemData => (
                <Pressable
                  key={itemData.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: dimens.ho5,
                  }}
                  onPress={() => {
                    onItemClick(itemData);
                  }}>
                  <MaterialCommunityIcons
                    name={
                      itemData.isSelected ? 'radiobox-marked' : 'radiobox-blank'
                    }
                    size={24}
                    color={
                      itemData.isSelected ? colors.infoblue : colors.black30
                    }
                  />
                  <Text
                    style={[
                      commonStyles.body1,
                      {color: colors.black60, marginStart: dimens.w2},
                    ]}>
                    {itemData.name}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* separator section  */}
            <View
              style={[
                commonStyles.flex_direction_row,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: dimens.h2,
                },
              ]}>
              <View
                style={{
                  backgroundColor: colors.singleLine,
                  width: dimens.w40,
                  height: dimens.ho1,
                }}
              />
              <Text
                style={[
                  commonStyles.body2,
                  {color: colors.lightGray, marginHorizontal: dimens.w5},
                ]}>
                or
              </Text>
              <View
                style={{
                  backgroundColor: colors.singleLine,
                  width: dimens.w40,
                  height: dimens.ho1,
                }}
              />
            </View>

            {/* select date section */}
            <View style={styles.topView2}>
              <Text style={commonStyles.subTitlesNbuttons}>
                {strings.filterbyDate}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}>
                <TextInput
                  onPressIn={e => {
                    console.log('man', e.nativeEvent.touches);
                    setDatePickerFrom(true);
                  }}
                  label="From"
                  mode="outlined"
                  value={fromDate}
                  editable={false}
                  style={[
                    styles.input,
                    styles.disabledInput,
                    // commonStyles.PlaceholderNOverline,
                  ]}
                  right={
                    <TextInput.Icon
                      icon={'calendar-range-outline'}
                      size={24}
                      style={{top: 4}}
                      color={colors.black30}
                      disabled
                    />
                  }
                />
                <TextInput
                  onPressIn={() => {
                    console.log('man');
                    setDatePickerTo(true);
                  }}
                  label="To"
                  mode="outlined"
                  value={toDate}
                  editable={false}
                  style={[
                    styles.input,
                    styles.disabledInput,
                    // commonStyles.PlaceholderNOverline,
                  ]}
                  right={
                    <TextInput.Icon
                      icon={'calendar-range-outline'}
                      size={24}
                      style={{top: 4}}
                      color={colors.black30}
                      disabled
                    />
                  }
                />
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Pressable
              style={{
                width: dimens.w40,
                height: dimens.h5_7,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Text style={[commonStyles.subTitlesNbuttons]}>
                {strings.cancel}
              </Text>
            </Pressable>
            <ButtonComp
              label={strings.apply}
              onPress={() => {}}
              customStyle={{width: dimens.w40}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StatisticsFilter;
