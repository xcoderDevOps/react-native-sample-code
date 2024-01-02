import React, {useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Animated,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Pressable,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SlidingUpPanel from 'rn-sliding-up-panel';
import useStyles from './SlidePanelStyle';
import moment from 'moment';
import {useSelector} from 'react-redux';
import images from '../constants/images';
import {VideoScreen as VideoPlayer} from '../features/VideoSection';
import {useNavigation, useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {commonStackIdentifier} from '../../App';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ReusableSlidingPanel = ({children, onDragEnd, customData, hidePanel}) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const styles = useStyles();
  const panelRef = useRef(null);
  const videoPlayerSliceReducer = useSelector(
    state => state.videoPlayerSliceReducer,
  );
  const ios = Platform.OS === 'ios';
  const deviceHeight = useWindowDimensions().height;
  const insets = useSafeAreaInsets();
  const statusBarHeight = ios ? insets.bottom : StatusBar.currentHeight;
  const draggableRange = {
    top: deviceHeight / 2,
    bottom: 120,
  };

  const snappingPoints = [draggableRange.top, draggableRange.bottom];

  const [panelPositionVal] = useState(new Animated.Value(-1));
  // const [panelPositionVal] = useState(
  //   new Animated.Value(draggableRange.bottom),
  // );

  const handleDragEnd = useCallback(
    value => {
      if (onDragEnd) {
        onDragEnd(value === draggableRange.top);
      }
    },
    [onDragEnd, draggableRange],
  );

  // console.log('-customData----', customData);
  const handleImagePress = items => {
    console.log('items-----', items);
  };

  const someFunctionThatNeedsToHidePanel = () => {
    hidePanel();
  };

  const renderData = ({item}) => {
    const timestamp = customData?.incident_alert?.created_at;
    const parsedTime = moment(timestamp);
    // Format the time in 12-hour clock with 'am/pm'
    const formattedTime = parsedTime.format('h:mm A');
    const checkSeverity = customData?.severity_level?.name;
    // console.log('formattedTime----', customData?.title);

    return (
      <View style={styles.mainWrapContainer}>
        <View style={styles.crossBtnContainer}>
          <Pressable
            hitSlop={{top: 600, bottom: 500, left: 500, right: 500}}
            style={styles.closeBtnContainer}
            onPress={someFunctionThatNeedsToHidePanel}>
            <Icon name="close-outline" size={26} color={colors.black} />
          </Pressable>
        </View>
        <View style={styles.wrapContainer}>
          {/*  */}
          <View style={styles.titleViewStyle}>
            <Text style={styles.titleTextStyle}>{customData?.title}</Text>
          </View>
          {/*  */}
          <View style={styles.subTextViewStyle}>
            <View style={styles.subTextRowViewStyle}>
              <Text
                style={styles.subTextStyle}
                ellipsizeMode="tail"
                numberOfLines={1}>
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
              <Text style={styles.subTextStyle}> High severity level </Text>
            </View>
          </View>
          {customData?.media && (
            <ScrollView
              bounces={false}
              contentContainerStyle={styles.scrollviewContainer}
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {customData?.media?.map((items, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      handleImagePress(items);
                      navigation.navigate(commonStackIdentifier.video_screen, {
                        params: {
                          media2: customData?.media,
                          selectedIndex: index,
                        },
                      });
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
              media={customData?.media}
              // ... other props
            />
          )}

          <View style={styles.bottomManageView} />
        </View>
      </View>
    );
  };

  return (
    <SlidingUpPanel
      ref={panelRef}
      animatedValue={panelPositionVal}
      draggableRange={draggableRange}
      // draggableRange={{top: deviceHeight / 1.75, bottom: 120}}
      snappingPoints={snappingPoints}
      backdropOpacity={0}
      showBackdrop={false}
      allowDragging={true}
      // onMomentumDragEnd={handleDragEnd}
      height={deviceHeight}>
      <View style={styles.panelContent}>
        {/* <PanelHandle /> */}
        <View style={styles.renderDataView}>{renderData(customData)}</View>
      </View>
    </SlidingUpPanel>
  );
};

export default ReusableSlidingPanel;
