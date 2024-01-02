import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import HeaderWithText from '../../components/headerComponent/HeaderWithText';
import images from '../../constants/images';
import {useNavigation} from '@react-navigation/core';
import {List} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {useTheme} from '@react-navigation/native';
import useStyles from './ReportCrimeStyle';
import DatePickerBottomSheet from '../../components/DatePickerBottomSheet';
import {getDate, getTime} from '../../commonSlices/datePickerSlice';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import SeverityLevelChip from '../../components/chipComponent/SeverityLevelChip';
import CurrentLocationButton from '../../components/CurrentLocationButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ButtonComp from '../../components/buttonComponent/ButtonComp';
import MediaPicker from '../../components/mediaCompnent/MediaPicker';
import CloseIcon from 'react-native-vector-icons/Ionicons';
import ImageIcon from 'react-native-vector-icons/MaterialIcons';
import {
  selectCrimeLocation,
  setCrimeMapAddress,
} from '../../commonSlices/mapViewSlice';
import {setSeverityLevel} from '../../commonSlices/severityLevelSlice';
import {
  clearStateMedia,
  removeMediaFile,
  setMediaFile,
} from '../../commonSlices/mediaSlice';
import {strings} from '../../constants/Strings';
import {commonStackIdentifier} from '../../../App';

const ReportCrime = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const styles = useStyles();
  const selector = useSelector(state => state.datePickerReducer);

  const getMediaFileSelector = useSelector(state => state.mediaSliceReducer);
  /**
   * This selector take both location current location buttons as well as from map
   * @property crimeLocationSelector
   */
  const crimeLocationSelector = useSelector(selectCrimeLocation);
  const getSeverityLevel = useSelector(
    state => state.severityLevelSliceReducer,
  );
  const minTextLimit = 50;
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [crimeDate, setCrimeDate] = useState(false);
  const [openTimePicker, setOpenTimerPicker] = useState(false);
  const [description, setDescription] = useState('');
  const [mediaFile, setIsMedia] = useState('');
  const currentTime = moment();
  const formattedTime = currentTime.format('HH:mm:ss');

  const currentDate = moment();
  // Format the current date as a string (optional)
  const formattedDate = currentDate.format('YYYY-MM-DD');
  // console.log('formattedDate---', formattedDate);

  const disabled =
    !selectedItem ||
    !selector?.selectDate ||
    !selector?.selectTime ||
    description?.length < minTextLimit ||
    !getMediaFileSelector?.mediaFiles ||
    !crimeLocationSelector ||
    !getSeverityLevel?.selectSeverityLevel;

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const data = [
    {id: 1, title: 'Item 1'},
    {id: 2, title: 'Item 2'},
    {id: 3, title: 'Item 3'},
  ];

  const handleItemPress = item => {
    setSelectedItem(item);
    setExpanded(false);
  };

  console.log('crimeLocationSelector------', getMediaFileSelector?.mediaFiles);
  // console.log(
  //   'selector----',
  //   moment(selector?.selectTime, 'h:mm:ss A').format('HH:mm:ss'),
  // );

  const handleLocationPress = location => {
    // Handle the obtained location as needed
    console.log('Obtained Location:', location);
    if (location?.placeName) {
      alert(location?.placeName);
      dispatch(setCrimeMapAddress(location?.placeName));
    }
  };

  const handleMediaSelected = media => {
    // Do something with the selected media, e.g., send it to a server
    console.log('Selected Media:', media);
    setIsMedia(media?.fileName);
  };

  const handleTextChange = text => {
    setDescription(text);
  };

  const handleEndEditing = () => {
    if (description.length < minTextLimit) {
      // If the text is less than the minimum limit, update it
      alert('Please Enter 50 or more Characters');
      // setDescription('');
    }
  };

  const handleRemoveMedia = index => {
    const fileNameToRemove = getMediaFileSelector?.mediaFiles[index]?.fileName;
    if (fileNameToRemove) {
      dispatch(removeMediaFile(fileNameToRemove));
    }
  };

  return (
    <View style={styles.parentContainerStyle}>
      <View style={styles.headerContainerStyle}>
        <HeaderWithText
          prefixIcon={images.leftArrow}
          prefixStyle={styles.prefixStyle}
          onPrefixPress={() => {
            navigation.goBack();
          }}
          title={'Report Crime'}
          imageIcon={images.sheild}
          imageIconStyle={styles.imageIconStyle}
          suffixIcon={''}
        />
      </View>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex: 1}}
        keyboardShouldPersistTaps="handled">
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewStyle}
          contentContainerStyle={styles.scrollviewContainer}>
          {/* -------------- dropdown -------------------- */}
          <Text style={[styles.titleStyle, {right: 0}]}>
            {strings.reportCrimeHeader.crime_type}
          </Text>
          <List.Section
            style={{}}
            titleStyle={styles.titleStyle}
            // title="Select the type of crime"
          >
            <List.Accordion
              title={selectedItem ? selectedItem.title : ''}
              expanded={expanded}
              onPress={handlePress}
              style={styles.accordionStyle}
              // left={props => <List.Icon {...props} />}
              right={() => (
                <Icon name="caretdown" size={12} color={colors.black30} />
              )}>
              {data.map(item => (
                <List.Item
                  /**
                   * dropdown list style goes here after discussion of ui
                   * @param style
                   */
                  style={{}}
                  key={item.id}
                  title={item.title}
                  onPress={() => handleItemPress(item)}
                />
              ))}
            </List.Accordion>
          </List.Section>

          {/* -------------- datePicker -------------------- */}
          <View style={styles.spacingContainer}>
            <Text style={[styles.titleStyle, {right: 0}]}>
              {strings.reportCrimeHeader.date_picker_header}
            </Text>
            <Text style={styles.subTitleStyle}>Choose the date</Text>
            <Pressable
              onPress={() => setCrimeDate(true)}
              style={[styles.accordionStyle, styles.datePickerStyle]}>
              <Text style={{textAlign: 'center'}}>
                {moment(selector?.selectDate, 'DD/MM/YYYY').format('MM/DD/YY')}
              </Text>
              <Image
                style={styles.closeStyle}
                tintColor={colors.black30}
                source={images.calender}
              />
            </Pressable>
          </View>
          {/* -------------- timePicker -------------------- */}

          <View style={styles.spacingContainer}>
            <Text style={[styles.titleStyle, {right: 0}]}>
              {strings.reportCrimeHeader.time_picker_header}
            </Text>
            <Text style={styles.subTitleStyle}>{'(optional)'}</Text>
            <Pressable
              onPress={() => setOpenTimerPicker(true)}
              style={[styles.accordionStyle, styles.datePickerStyle]}>
              <Text style={{textAlign: 'center'}}>
                {moment(selector?.selectTime, 'h:mm:ss A').format('HH:mm:ss')}
              </Text>
              <Image
                resizeMode="contain"
                style={styles.closeStyle}
                tintColor={colors.black30}
                source={images.clock}
              />
            </Pressable>
          </View>

          {/* --------------------- severity rate badges ----------------------- */}
          <View style={styles.spacingContainer}>
            <Text style={[styles.titleStyle, {right: 0}]}>
              {strings.reportCrimeHeader.severity_level_header}
            </Text>
            <SeverityLevelChip />
          </View>
          {/* ------------------- get current location section ----------------- */}

          <View style={styles.currentLocationContainer}>
            <View
              style={{
                // borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={[styles.titleStyle, {right: 0}]}>
                {strings.reportCrimeHeader.crime_add_header}
              </Text>
              <Text
                onPress={() =>
                  navigation.navigate(commonStackIdentifier.crime_location_map)
                }
                style={[styles.titleStyle, {right: 0, color: colors.infoblue}]}>
                {'Change'}
              </Text>
            </View>

            {crimeLocationSelector ? (
              <View style={styles.selectedLocationContainer}>
                <Image
                  style={styles.pinStyle}
                  resizeMode="contain"
                  source={images.pin}
                />
                <View style={styles.addressContainer}>
                  <Text ellipsizeMode="tail" numberOfLines={1} style={{}}>
                    {crimeLocationSelector}
                  </Text>
                </View>
              </View>
            ) : (
              <>
                <CurrentLocationButton onPress={handleLocationPress} />

                <View style={styles.dividerStyle}>
                  <View style={styles.dividerLeftPart} />
                  <Text>or</Text>
                  <View style={styles.dividerRightPart} />
                </View>

                <CurrentLocationButton mapViewButton={true} />
              </>
            )}
          </View>

          {/* ------------------------- Description box ------------------------- */}

          <View style={styles.descriptionSpacingContainer}>
            <Text style={styles.descriptionTitleStyle}>
              {strings.reportCrimeHeader.description_header}
            </Text>
            <View style={{paddingTop: 10}}>
              <TextInput
                style={styles.descriptionBoxStyle}
                placeholderTextColor={colors.black30}
                multiline
                numberOfLines={4}
                placeholder="Type here"
                value={description}
                onEndEditing={handleEndEditing}
                onChangeText={text => handleTextChange(text)}
              />
            </View>
          </View>

          {/* ------------------------- Description Crime - attachments ------------------------- */}

          <View style={styles.descriptionSpacingContainer}>
            <Text style={styles.descriptionTitleStyle}>
              Add photos & videos
            </Text>

            <ScrollView
              contentContainerStyle={{}}
              showsHorizontalScrollIndicator={false}
              horizontal>
              {getMediaFileSelector?.mediaFiles?.length
                ? getMediaFileSelector?.mediaFiles?.map((res, index) => (
                    <View key={index} style={styles.mediaListContainer}>
                      <ImageIcon
                        name="image"
                        size={26}
                        color={colors.infoblue}
                      />
                      <Text
                        style={styles.mediaTextStyle}
                        ellipsizeMode="head"
                        numberOfLines={1}>
                        {res?.fileName?.toString()}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleRemoveMedia(index)}>
                        <CloseIcon
                          name="close-outline"
                          size={26}
                          color={colors.black30}
                        />
                      </TouchableOpacity>
                    </View>
                  ))
                : null}
            </ScrollView>

            <MediaPicker
              onMediaSelect={handleMediaSelected}
              // setMediaFile={setIsMedia}
            />
          </View>

          {/* ------------------------- Submit button ------------------------- */}
          <ButtonComp
            // icon=""
            disabled={disabled}
            label="Continue"
            onPress={() => {
              alert('Report submit!');
              dispatch(setCrimeMapAddress(''));
              dispatch(setSeverityLevel(''));
              setDescription('');
              dispatch(setMediaFile(''));
              dispatch(getDate(formattedDate.toString()));
              dispatch(getTime(formattedTime.toString()));
              setSelectedItem(null);
              dispatch(clearStateMedia());
            }}
            customStyle={styles.submitButtonStyle}
          />
        </ScrollView>
      </KeyboardAwareScrollView>

      {/* ------------------------- Date picker ------------------------- */}
      {crimeDate && (
        <DatePickerBottomSheet
          visibility={crimeDate}
          onBackdropPress={() => {
            setCrimeDate(false);
          }}
          onItemClick={item => {
            dispatch(getDate(item));
          }}
          selectedDate={moment(selector?.selectDate?.toString())}
        />
      )}

      {/* ------------------------- Time picker ------------------------- */}
      {openTimePicker && (
        <DatePickerBottomSheet
          isHeaderTitle={true}
          headerTitle={'Select Time'}
          isTimePicker={true}
          visibility={openTimePicker}
          onBackdropPress={() => {
            setOpenTimerPicker(false);
          }}
          onItemClick={item => {
            dispatch(getTime(item));
          }}
        />
      )}
    </View>
  );
};

export default ReportCrime;
