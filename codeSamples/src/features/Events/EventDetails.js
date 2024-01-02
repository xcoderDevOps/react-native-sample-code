import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  TouchableOpacity,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {
  CommentsLevelOne,
  EventDetailsData,
} from '../../utilities/DummyResponseData';
import CommonStyles from '../CommonStyles';
import HeaderWithText from '../../components/headerComponent/HeaderWithText';
import {strings} from '../../constants/Strings';
import {useTheme} from '@react-navigation/native';
import images from '../../constants/images';
import useStyles from './EventDetailsStyles';
import moment from 'moment';
import {dimens} from '../../constants/dimens';
import ButtonComp from '../../components/buttonComponent/ButtonComp';
import HorizontalVideoPhotoList from '../../components/HorizontalVideoPhotoList';
import ComentViewTextInputView from './ComentViewTextInputView';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomSegmentedControl from '../../components/CustomSegmentedControl';
import ComentViewListComp from './ComentViewListComp';
import AlertThreatList from './AlertThreatList';

const EventDetails = ({props}) => {
  const commonStyles = CommonStyles();
  const styles = useStyles();
  const {colors} = useTheme();
  const totalLinesToshow = EventDetailsData.details.length; // Set the initial number of lines to display
  const [linesToShow, setLinesToShow] = useState(3);
  const [showAll, setShowAll] = useState(false);
  const segments = ['Comments', 'Alert / Threat'];
  const formatTime = inputTime => {
    const time = moment(inputTime, 'HH:mm:ss');
    return time.format('h:mm A');
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [commentsDataLocal, setCommentsDataLocal] = useState(CommentsLevelOne);

  const handleSegmentPress = index => {
    setSelectedIndex(index);
    
    // Handle logic for the selected segment
  };

  const handleLoadMore = () => {
    setShowAll(true);
    setLinesToShow(totalLinesToshow);
  };

  const handleHide = () => {
    setLinesToShow(3);
    setShowAll(false);
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const handleCommentAdded = () => {
    let currentdata = {...commentsDataLocal};

    let commentsAdded = {
      id: getRandomInt(1000, 9000),
      text: 'Witnessing an armed robbery at 123 Main Street. Multiple perpetrators, three individuals armed with firearms, are actively involved. Eyewitnes',
      posted_by: getRandomInt(1000, 9000),
      parentId: null,
      timestamp: 'Feb 23, 1:23 AM',
      totalReplies: 0,
      user_Img:
        'https://ui.tradeshift.com/v10/dist/components/userimages/assets/jim.png',
    };
    
    // setCommentsDataLocal([...commentsAdded]);
    setCommentsDataLocal(prevComments => ({
      ...prevComments,
      comments: [commentsAdded, ...prevComments.comments],
    }));
  };

  const renderTabContent = [
    <View key={0} style={{justifyContent: 'center', alignItems: 'center'}}>
      <ComentViewTextInputView
        isAutoFocus={false}
        onSubmit={() => {
          handleCommentAdded();
        }}
        onTextChanges={text => {
          
        }}
      />
      <ComentViewListComp data={commentsDataLocal} props={props} />
    </View>,
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: dimens.h2,
      }}
      key={1}>
      <AlertThreatList />
    </View>,
    <ScrollView
      bounces={false}
      contentContainerStyle={{}}
      key={2}></ScrollView>,
  ];

  return (
    <SafeAreaView style={commonStyles.flex_1}>
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView
          style={{flex: 1}}
          bounces={false}
          // keyboardVerticalOffset={60}
          // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
          <HeaderWithText
            prefixIcon={images.leftArrow}
            prefixStyle={styles.headLeftArrow}
            onPrefixPress={() => {
              props.navigation.goBack();
            }}
            title={strings.event_details}
            suffixIcon={isBookmarked ? 'bookmark' : 'bookmark-border'}
            suffixIconColor={colors.infoblue}
            onSuffixPress={() => {
              setIsBookmarked(!isBookmarked);
            }}
          />
          {/* top info sections  */}
          <View style={styles.topViewContainer}>
            <Text style={commonStyles.heading3}>{EventDetailsData.title}</Text>

            <View style={styles.colummnsSty}>
              <View style={styles.rowSty}>
                <Image
                  source={images.clock}
                  style={styles.imageStyl}
                  resizeMode="center"
                />
                <Text style={[commonStyles.body1, {marginStart: dimens.w1_2}]}>
                  {moment(EventDetailsData.date).format('ddd D MMM')}{' '}
                  {formatTime(EventDetailsData.time)}{' '}
                </Text>
              </View>

              <View style={styles.rowSty}>
                <Image
                  source={images.nearBy}
                  style={styles.imageStyl}
                  resizeMode="center"
                />
                <Text style={[commonStyles.body1, {marginStart: dimens.w1_2}]}>
                  {EventDetailsData.distance}
                </Text>
              </View>

              <View style={styles.rowSty}>
                <Image
                  source={images.locationblue}
                  style={styles.imageStyl}
                  resizeMode="center"
                />
                <Text style={[commonStyles.body1, {marginStart: dimens.w1_2}]}>
                  {EventDetailsData.address}
                </Text>
              </View>

              <View style={styles.rowSty}>
                <Image
                  source={images.locationblue}
                  style={styles.imageStyl}
                  resizeMode="center"
                />
                <Text style={[commonStyles.body1, {marginStart: dimens.w1_2}]}>
                  {EventDetailsData.address}
                </Text>
              </View>
            </View>

            <Text style={commonStyles.body1} numberOfLines={linesToShow}>
              {EventDetailsData.details}
            </Text>
            <TouchableOpacity
              onPress={() => {
                !showAll ? handleLoadMore() : handleHide();
              }}>
              <Text style={[commonStyles.body1, {color: colors.infoblue}]}>
                {strings.more}
              </Text>
            </TouchableOpacity>
          </View>
          {/* media section */}
          <View
            style={{
              width: dimens.w100,
              height: dimens.h10,
              marginStart: dimens.h2,
              justifyContent: 'center',
            }}>
            <HorizontalVideoPhotoList
              isHorizontal={true}
              flatListData={EventDetailsData.media}
            />
          </View>
          {/* button sections */}
          <View
            style={{
              marginTop: dimens.h2,
              marginBottom: dimens.h2_5,
            }}>
            <ButtonComp
              label={strings.openinMap}
              customStyle={{width: dimens.w92}}
            />
          </View>
          <View
            style={{
              backgroundColor: colors.black20,
              width: dimens.w100,
              height: dimens.ho1,
            }}
          />
          {/* segment control sections  */}
          {/* <View></View> */}

          <CustomSegmentedControl
            segments={segments}
            selectedIndex={selectedIndex}
            onSegmentPress={handleSegmentPress}
            renderTabContent={renderTabContent}
            isShowCount={true}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EventDetails;
