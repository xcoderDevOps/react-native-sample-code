import React from 'react';
import {View, Text, TouchableOpacity, StatusBar, Platform} from 'react-native';
import {useTheme} from '@react-navigation/native';

import ModalNew from 'react-native-modal';

import useStyles from './DatePickerStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';

import DatePicker from 'react-native-date-picker';
import {useState} from 'react';

import moment from 'moment';
import {useSelector} from 'react-redux';
import {dimens} from '../constants/dimens';
import {strings} from '../constants/Strings';
import ButtonComp from './buttonComponent/ButtonComp';

const DatePickerBottomSheet = ({
  visibility,
  onBackdropPress,
  onItemClick,
  isTimePicker = false,
  isRedBtn = false,
  isHeaderTitle = false,
  headerTitle,
  selectedDate = new Date(),
}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const [date, setDate] = useState(moment(selectedDate).toDate());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const formattedTime = moment(selectedTime, 'h:mm:ss A').format('HH:mm:ss');
  

  return (
    <ModalNew
      animationInTiming={400}
      animationOutTiming={400}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      style={{
        borderRadius: 20,
        justifyContent: 'flex-end',
        margin: 0,
      }}
      hideModalContentWhileAnimating={true}
      // useNativeDriver={true}
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onBackdropPress}
      // deviceWidth={util.getDeviceWidth}
      swipeDirection={['down']}
      // deviceHeight={t}
      isVisible={visibility}>
      <StatusBar
        translucent
        // backgroundColor="transparent"
        backgroundColor={colors.black}
        barStyle={'dark-content'}
      />
      <View
        style={{
          // borderRadius: 20,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          // backgroundColor: colors.backgroundWhite,
          backgroundColor: colors.black10,
          alignItems: 'center',
          //   padding: 20,
          //   paddingVertical: 40,
          //   paddingTop: 10,
          height: dimens.h46,
        }}>
        <Text style={styles.titleText}>
          {!isHeaderTitle ? 'Select Birthdate' : headerTitle}
        </Text>
        {/* <TouchableOpacity
          style={{position: 'absolute', right: 10, top: 10}}
          onPress={onBackdropPress}>
          <AntDesign
            name="closecircleo"
            size={dimens.w6}
            color={colors.black}
            style={{width: dimens.w6, height: dimens.h3}}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            // top: -10,
            // left:-10,
            borderRadius: dimens.w5,
            backgroundColor: colors.white,
            //margin: 5,
            padding: dimens.w2_5,
          }}
          onPress={onBackdropPress}>
          <AntDesign
            name="close"
            size={dimens.w5}
            color={colors.textInputTextColor}
            style={{
              width: dimens.w5,
              height: dimens.w5,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: dimens.h1, alignItems: 'center'}}>
          {isTimePicker ? (
            <DatePicker
              theme="light"
              date={selectedTime}
              onDateChange={setSelectedTime}
              mode={'time'}
              format="HH:mm"
              // maximumDate={new Date()}
              fadeToColor={colors.darkWhite}
              style={{backgroundColor: colors.darkWhite}}
            />
          ) : (
            <DatePicker
              theme="light"
              date={date}
              onDateChange={setDate}
              mode={'date'}
              maximumDate={new Date()}
              // androidVariant={'iosClone'} // or 'iosClone'
              // fadeToColor={colors.backgroundWhite}
              fadeToColor={colors.darkWhite}
              style={{backgroundColor: colors.darkWhite}}
              // style={{backgroundColor:colors.backgroundWhite}}
            />
          )}
        </TouchableOpacity>

        <ButtonComp
          //   disabled={isDisabled}
          //   icon="arrowright"
          customStyle={{marginTop: Platform.OS === 'ios' ? 30 : 50}}
          label={strings.submit}
          onPress={() => {
            onItemClick(
              isTimePicker
                ? moment(selectedTime).format('HH:mm:ss')
                : moment(date).format('DD/MM/YYYY'),
            );
            onBackdropPress();
          }}
        />
      </View>
    </ModalNew>
  );
};

export default DatePickerBottomSheet;
