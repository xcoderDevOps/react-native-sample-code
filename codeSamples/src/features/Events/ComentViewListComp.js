import {
  View,
  Text,
  Image,
  Keyboard,
  Animated,
  InputAccessoryView,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import useStyles from './ComentViewListCompStyle';
import CommonStyles from '../CommonStyles';
import {useTheme} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import images from '../../constants/images';
import {strings} from '../../constants/Strings';
import font from '../../constants/font';
import {dimens} from '../../constants/dimens';
import Feather from 'react-native-vector-icons/Feather';
import {
  CommentsLevelTwo,
  CommentsLevelTwoData2,
  CommentsLevelTwoData2_2,
} from '../../utilities/DummyResponseData';
import {commonStackIdentifier} from '../../../App';
const ComentViewListComp = ({data = [], props}) => {
  const commonStyles = CommonStyles();
  const styles = useStyles();
  const {colors} = useTheme();
  const [commentsData, setCommentsData] = useState();
  const [replyData, setReplyData] = useState([]);

  useEffect(() => {
    // let comments = [...commentsData];

    let newComments = data.comments.map(item => ({
      ...item,
      isViewExpanded: false,
      linesToShow: 3,
      isShowAll: false,
    }));
    setCommentsData([...newComments]);
    setReplyData([]);
  }, [data.comments.length]);

  const mimicApiCall = tempId => {
    if (tempId === 101) {
      let replies = [...CommentsLevelTwo.replies];

      let newReplies = replies.map(item => ({
        ...item,
        isViewExpanded: false,
        linesToShow: 3,
        isShowAll: false,
      }));

      setReplyData([...replyData, ...newReplies]);
      // setReplyData(prevReply => ({
      //   ...prevReply,
      //   newReplies,
      // }));
    } else {
      let replies = [...CommentsLevelTwoData2.replies];

      let newReplies = replies.map(item => ({
        ...item,
        isViewExpanded: false,
        linesToShow: 3,
        isShowAll: false,
      }));

      setReplyData([...replyData, ...newReplies]);
      // setReplyData(prevReply => ({
      //   ...prevReply,
      //   newReplies,
      // }));
    }
  };

  const handleLoadMore = item => {
    let originalData = [...commentsData];

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
    setCommentsData([...tempArr]);
    // setShowAll(true);
    // setLinesToShow(totalLinesToshow);
  };

  const handleHide = item => {
    let originalData = [...commentsData];

    let tempArr = originalData.map(itemMap => {
      if (itemMap.id === item.id) {
        return {...itemMap, linesToShow: 3, isShowAll: !item.isShowAll};
      }
      return itemMap;
    });
    setCommentsData([...tempArr]);
    // setLinesToShow(1);
    // setShowAll(false);
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
    let originalData = [...commentsData];
    let tempId;
    let tempArr = originalData.map(itemMap => {
      tempId = item.id;
      if (itemMap.id === item.id) {
        return {...itemMap, isViewExpanded: !itemMap.isViewExpanded};
      }
      return {...itemMap};
    });
    
    setCommentsData([...tempArr]);

    setTimeout(() => {
      mimicApiCall(tempId);
    }, 2000);
  };

  const onLoadMoreRepliesBasedonID = item => {
    
    let replies = [...CommentsLevelTwoData2_2.replies];

    let newReplies = replies.map(item => ({
      ...item,
      isViewExpanded: false,
      linesToShow: 3,
      isShowAll: false,
    }));

    setReplyData([...replyData, ...newReplies]);
   
  
  const onReplyClick = item => {
    
    props.navigation.navigate(commonStackIdentifier.comments_add_reply, {
      itemData: item,
    });
  };

  const renderCommentsUILevelTwo = (item, index, parentData) => {
    return (
      <>
        {item.parentId == parentData.id && (
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
        )}
      </>
    );
  };

  const renderCommentsUILevelOne = ({item, index}) => {
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
                  onViewMorePress(item);
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
            ListFooterComponent={() => (
              <Pressable
                onPress={() => {
                  onLoadMoreRepliesBasedonID(item);
                }}
                style={[
                  commonStyles.flex_direction_row,
                  {marginStart: dimens.w10},
                ]}>
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
          />
        )}

        {/* {true && (
          <Pressable
            onPress={() => {
              onViewMorePress(item);
            }}
            style={[
              commonStyles.flex_direction_row,
              {marginStart: dimens.w10},
            ]}>
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
        )} */}

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
    <FlatList
      data={commentsData}
      scrollEnabled={false}
      renderItem={renderCommentsUILevelOne}
    />
  );
};

export default ComentViewListComp;
