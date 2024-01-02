import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {data} from '../../utilities/dummyData';
import useStyles from './ListViewCompStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomBottomSheet from '../CustomeBottomSheet';
import {useNavigation, useTheme} from '@react-navigation/native';
import images from '../../constants/images';
import {commonStackIdentifier} from '../../../App';
import {VideoScreen as VideoPlayer} from '../../features/VideoSection';
import {useDispatch, useSelector} from 'react-redux';
import {getMediaType, getVideoUrl} from '../../commonSlices/videoPlayerSlice';
import moment from 'moment';

const ListViewComp = props => {
  const navigation = useNavigation();
  const styles = useStyles();
  const sheetRef = useRef();
  const videoRef = useRef();
  const {colors} = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const dispatch = useDispatch();
  const videoPlayerSliceReducer = useSelector(
    state => state.videoPlayerSliceReducer,
  );
  // console.log('videoPlayerSliceReducer----', videoPlayerSliceReducer?.source);

  const eventTypeData = [
    {key: 'eventType', text: 'Event Type'},
    {key: 'severityLevel', text: 'Severity Level'},
    {key: 'radius', text: 'Radius'},
  ];

  const handleImagePress = item => {
    // console.log('kmsnjkfnsjdn---:---', item?.type);
    dispatch(getMediaType(item?.type));
    setModalVisible(true);
    if (item.type === 'video/mp4' || item.type === 'image/jpeg') {
      dispatch(getVideoUrl(item.name));
      // setSelectedVideo(item.name);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => openBottomSheet(item.text)}
      style={styles.renderFlatlistContainer}>
      <View style={styles.eventTextContainer}>
        <Text style={styles.eventTextStyle}>{item.text}</Text>
        <Icon name="arrow-drop-down" size={26} color={colors.black} />
      </View>
    </TouchableOpacity>
  );

  const openBottomSheet = itemText => {
    setSelectedItem(itemText);
    sheetRef?.current?.open();
  };

  const closeBottomSheet = () => {
    setSelectedItem(null);
    sheetRef?.current?.close();
  };

  const renderData = ({item}) => {
    // console.log('itemsss-----', item?.media);

    const timestamp = item?.incident_alert?.created_at;
    const parsedTime = moment(timestamp);

    // Format the time in 12-hour clock with 'am/pm'
    const formattedTime = parsedTime.format('h:mm A');

    const checkSeverity = item?.severity_level?.name;

    const handleEventDetailScreen = () => {
      navigation.navigate(commonStackIdentifier.event_details);
    };

    let textLength = `${item?.severity_level?.name} severity level`;

    console.log(textLength.length);

    return (
      <TouchableWithoutFeedback style={styles.parentContainer}>
        <TouchableOpacity onPress={handleEventDetailScreen}>
          <View style={styles.mainWrapContainer}>
            <View style={styles.wrapContainer}>
              {/*  */}
              <View style={styles.titleViewStyle}>
                <Text style={styles.titleTextStyle}>{item?.title}</Text>
              </View>
              {/*  */}
              <View style={styles.subTextViewStyle}>
                <View style={styles.subTextRowViewStyle}>
                  <Text style={styles.subTextStyle}>
                    {formattedTime} • 12 miles away •{' '}
                  </Text>

                  <Image
                    resizeMode="contain"
                    source={
                      checkSeverity === 'High'
                        ? images.high_severity
                        : checkSeverity === 'Moderate'
                        ? images.medium_severity
                        : images.low_severity
                    }
                    style={styles.severityImgStyle}
                  />
                  <ScrollView>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={styles.subTextStyle}>
                      {' '}
                      {textLength}{' '}
                    </Text>
                  </ScrollView>
                </View>
              </View>
              {/* This scroll view is for my reference will remove it after all set media proper */}
              {/* <ScrollView
                bounces={false}
                contentContainerStyle={{marginTop: 16}}
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                {item?.media?.map((items, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        handleImagePress(items);
                        navigation.navigate(
                          commonStackIdentifier.video_screen,
                          {
                            params: items,
                          },
                        );
                      }}
                      style={{paddingHorizontal: 10}}>
                      {items.type === 'video/mp4' ? (
                        <Image
                          source={{
                            uri: 'https://www.shutterstock.com/image-vector/nice-glyph-video-vector-icon-260nw-1394374856.jpg',
                          }}
                          style={{width: 80, height: 80}}
                        />
                      ) : (
                        <Image
                          source={{uri: items.name}}
                          style={{width: 80, height: 80}}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView> */}
              {item?.media && (
                <ScrollView
                  bounces={false}
                  contentContainerStyle={styles.scrollviewContainer}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}>
                  {item.media.map((items, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          handleImagePress(items);
                          navigation.navigate(
                            commonStackIdentifier.video_screen,
                            {
                              params: {
                                media2: item?.media,
                                selectedIndex: index,
                              },
                            },
                          );
                        }}
                        style={styles.mediaButtonContainer}>
                        {items.type === 'video/mp4' ? (
                          <Image
                            resizeMode="contain"
                            source={{
                              uri: 'https://www.shutterstock.com/image-vector/nice-glyph-video-vector-icon-260nw-1394374856.jpg',
                            }}
                            style={styles.thumbnailVideoImage}
                          />
                        ) : (
                          <Image
                            source={{uri: items.name}}
                            style={styles.thumbnailImage}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}

              {videoPlayerSliceReducer?.source && (
                <VideoPlayer
                  // videoURI={videoPlayerSliceReducer?.source}
                  media={item?.media}
                  // ... other props
                />
              )}

              <View style={styles.bottomManageView} />
            </View>
          </View>
        </TouchableOpacity>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.bottomSheerMainContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={eventTypeData}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            horizontal={true}
            style={styles.flatListContainer}
          />

          <RBSheet
            ref={sheetRef}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={183}
            customStyles={{
              container: styles.bottomSheetContainer,
              wrapper: {},
              draggableIcon: styles.draggableIconContainer,
            }}>
            <CustomBottomSheet
              selectedItem={selectedItem}
              onClose={closeBottomSheet}
            />
          </RBSheet>
        </View>
      </View>

      {/* ------------ List View ---------------- */}
      <FlatList
        nestedScrollEnabled={true}
        data={data[0]?.data}
        keyExtractor={item => item.id}
        renderItem={renderData}
        style={{margin: 20}}
      />
    </View>
  );
};

export default ListViewComp;
