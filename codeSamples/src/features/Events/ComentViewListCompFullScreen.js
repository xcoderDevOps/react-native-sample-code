import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import useStyles from './ComentViewListCompStyle';
import CommonStyles from '../CommonStyles';
import {useTheme} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import images from '../../constants/images';
import {strings} from '../../constants/Strings';
import font from '../../constants/font';
import {dimens} from '../../constants/dimens';

import _ from 'lodash';
import {commonStackIdentifier} from '../../../App';
import {EventRegister} from 'react-native-event-listeners';
const ComentViewListCompFullScreen = ({
  data = {},
  props,
  onLoadmoreDataCalled,
}) => {
  const commonStyles = CommonStyles();
  const styles = useStyles();
  const {colors} = useTheme();
  const [commentsDataProps, setCommentsDataProps] = useState();
  const [commentsData, setCommentsData] = useState();
  const [replyData, setReplyData] = useState([]);

  useEffect(() => {
    const keysToAdd = {
      isViewExpanded: true,
      linesToShow: 3,
      isShowAll: false,
    };

    // Add keys to the comment
    const modifiedComment = {...data.comment, ...keysToAdd};

    // Add keys to each item in replies->data
    const modifiedRepliesData = data.replies.data.map(reply => ({
      ...reply,
      ...keysToAdd,
    }));

    // Create the modified data object
    const modifiedData = {
      comment: modifiedComment,
      replies: {
        ...data.replies,
        data: modifiedRepliesData,
      },
    };
    
    setCommentsData(modifiedData);

    setReplyData(modifiedRepliesData);
    setTimeout(() => {
      // onViewMorePress();
      // mimicApiCall();
    }, 1000);
  }, [data]);

  const mimicApiCall = tempId => {
    let replies = [...commentsData?.replies?.data];

    let newReplies = replies.map(item => ({
      ...item,
      isViewExpanded: false,
      linesToShow: 3,
      isShowAll: false,
    }));

    setReplyData([...newReplies]);
    
  };

  const handleLoadMore = item => {
    \

    setCommentsData(prevCommentData => ({
      ...prevCommentData,
      comment: {
        ...prevCommentData.comment,
        isShowAll: !item.isShowAll,
        linesToShow: item.text.length,
      },
    }));
  };

  const handleHide = item => {
    setCommentsData(prevCommentData => ({
      ...prevCommentData,
      comment: {
        ...prevCommentData.comment,
        isShowAll: false,
        linesToShow: 3,
      },
    }));
  };

  const handleLoadMoreReply = item => {
    let originalData = [...replyData];

    let tempArr = originalData.map(itemMap => {
      if (itemMap.id === item.id) {
        return {
          ...itemMap,
          linesToShow: item.text.length,
          isShowAll: !item.isShowAll,
        };
      }
      return itemMap;
    });
    setReplyData([...tempArr]);
    // setShowAll(true);
    // setLinesToShow(totalLinesToshow);
  };

  const handleHideReply = item => {
    let originalData = [...replyData];

    let tempArr = originalData.map(itemMap => {
      if (itemMap.id === item.id) {
        return {...itemMap, linesToShow: 3, isShowAll: !item.isShowAll};
      }
      return itemMap;
    });
    setReplyData([...tempArr]);
    // setLinesToShow(1);
    // setShowAll(false);
  };

  const onViewMorePress = item => {
    // Update the value of isViewExpanded to true
    setCommentsData(prevCommentData => ({
      ...prevCommentData,
      comment: {
        ...prevCommentData.comment,
        isViewExpanded: true,
      },
    }));

    // setTimeout(() => {
    mimicApiCall();
    // }, 100);
  };

  const onReplyClick = item => {
    EventRegister.emit('focusTextinput', item);
  };
  const onLoadMoreFromServer = () => {
    onLoadmoreDataCalled('hello');
  };

  const renderCommentsUILevelTwo = (item, index, parentData) => {
    return (
      <>
        {
          <View style={styles.level2View}>
            <Image
              source={{uri: item.user_Img}}
              style={styles.imageStyl}
              resizeMode="contain"
            />
            <View style={styles.view2}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[commonStyles.subTitlesNbuttons, {width: dimens.w25}]}
                  numberOfLines={1}>
                  {item.posted_by}
                </Text>
                <Text
                  style={[
                    commonStyles.body1,
                    {color: colors.black30, marginStart: dimens.w1_5},
                  ]}>
                  {item.timestamp}
                </Text>
              </View>
              <View>
                <Text
                  numberOfLines={item.linesToShow}
                  style={commonStyles.body1}>
                  {item.text}
                </Text>
                {item.text.length >= 20 && (
                  <Pressable
                    onPress={() => {
                      !item.isShowAll
                        ? handleLoadMoreReply(item)
                        : handleHideReply(item);
                    }}
                    style={{flexDirection: 'row'}}>
                    {/* <Text style={[commonStyles.body1]}>...</Text> */}
                    <Text
                      style={[commonStyles.body1, {color: colors.infoblue}]}>
                      {!item.isShowAll ? 'more' : 'hide'}
                    </Text>
                  </Pressable>
                )}

                {/* <Pressable>
                  <Text style={[commonStyles.body1, {color: colors.infoblue}]}>
                    Reply
                  </Text>
                </Pressable> */}
              </View>

              {/* <View
                style={{
                  backgroundColor: colors.black20,
                  width: dimens.w92,
                  height: dimens.ho1,
                  alignSelf: 'center',
                  marginTop: dimens.ho3,
                }}
              /> */}
            </View>
          </View>
        }
      </>
    );
  };

  const renderCommentsUILevelOne = item => {
    return (
      <>
        <View style={styles.view3}>
          <Image
            source={{uri: item.user_Img}}
            style={styles.imageStyl}
            resizeMode="contain"
          />
          <View style={styles.view4}>
            <View style={{flexDirection: 'row', flex: 2}}>
              <Text
                style={[commonStyles.subTitlesNbuttons, {width: dimens.w25}]}
                numberOfLines={1}>
                {item.posted_by}
              </Text>
              <Text
                style={[
                  commonStyles.body1,
                  {color: colors.black30, marginStart: dimens.w1_5},
                ]}>
                {item.timestamp}
              </Text>
            </View>
            <View>
              <Text numberOfLines={item.linesToShow} style={commonStyles.body1}>
                {item.text}
              </Text>
              {item.text.length >= 20 && (
                <Pressable
                  onPress={() => {
                    !item.isShowAll ? handleLoadMore(item) : handleHide(item);
                  }}
                  style={{flexDirection: 'row'}}>
                  {/* <Text style={[commonStyles.body1]}>...</Text> */}
                  <Text style={[commonStyles.body1, {color: colors.infoblue}]}>
                    {!item.isShowAll ? 'more' : 'hide'}
                  </Text>
                </Pressable>
              )}

              <Pressable
                onPress={() => {
                  onReplyClick(item);
                }}>
                <Text style={[commonStyles.body1, {color: colors.infoblue}]}>
                  Reply
                </Text>
              </Pressable>
            </View>
            {item.totalReplies > 0 && !item.isViewExpanded && (
              <Pressable
                onPress={() => {
                  onViewMorePress();
                }}
                style={commonStyles.flex_direction_row}>
                <View
                  style={{
                    backgroundColor: colors.black20,
                    width: dimens.w6,
                    height: dimens.ho1,
                    alignSelf: 'center',
                    marginTop: dimens.ho3,
                  }}
                />
                <Text
                  style={[
                    commonStyles.body2,
                    {color: colors.black30, marginStart: dimens.w2},
                  ]}>
                  View {item.totalReplies} Reply
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        {item.isViewExpanded && (
          <FlatList
            data={replyData}
            renderItem={item2 => {
              return renderCommentsUILevelTwo(item2.item, item2.index, item);
            }}
            ListFooterComponent={() => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    onLoadMoreFromServer();
                  }}
                  style={[
                    commonStyles.flex_direction_row,
                    {
                      alignItems: 'center',
                      // width: dimens.w92,
                      padding: dimens.h1,
                    },
                  ]}>
                  <View
                    style={{
                      backgroundColor: colors.black20,
                      width: dimens.w8,
                      height: dimens.ho1,
                      alignSelf: 'center',
                    }}
                  />
                  <Text style={[commonStyles.body2, {color: colors.black30}]}>
                    {'  ' + strings.load_more}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        )}

        <View
          style={{
            backgroundColor: colors.black20,
            width: dimens.w92,
            height: dimens.ho1,
            alignSelf: 'center',
            marginTop: dimens.h1,
          }}
        />
      </>
    );
  };

  return (
    // <FlatList
    //   data={commentsData}
    //   scrollEnabled={true}
    //   bounces={false}
    //   renderItem={renderCommentsUILevelOne}
    //   automaticallyAdjustKeyboardInsets
    //   // contentContainerStyle={{flex: 1}}
    // />
    <View style={{padding: dimens.w2}}>
      {!_.isEmpty(commentsData?.comment) &&
        renderCommentsUILevelOne(commentsData?.comment)}
    </View>
  );
};
export default ComentViewListCompFullScreen;
