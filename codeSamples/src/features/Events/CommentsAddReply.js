import {
  View,

  SafeAreaView,

  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ComentViewTextInputView from './ComentViewTextInputView';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  CombinedComments,
  CombinedCommentsPage2,
  
} from '../../utilities/DummyResponseData';

import ComentViewListCompFullScreen from './ComentViewListCompFullScreen';
import {TextInput} from 'react-native-paper';
import CommonStyles from '../CommonStyles';
import {useTheme} from '@react-navigation/native';
import {strings} from '../../constants/Strings';
import useStyles from './CommentsAddReplyStyle';
import HeaderWithText from '../../components/headerComponent/HeaderWithText';
import images from '../../constants/images';
const CommentsAddReply = ({props}) => {
  const {itemData} = props.route.params;
  const [commentsDataLocal, setCommentsDataLocal] = useState(CombinedComments);
  const commonStyles = CommonStyles();
  const styles = useStyles();
  const {colors} = useTheme();
  const {height} = useWindowDimensions();
  const testRef = useRef();

  const onClickDataload = () => {
    const nextPageData = CombinedCommentsPage2;

    // Merge replies data
    const mergedRepliesData = [
      ...commentsDataLocal.replies.data,
      ...nextPageData.replies.data,
    ];
    const updatedPagination = nextPageData.replies.pagination;
    
    // Update the state with merged data
    setCommentsDataLocal({
      comment: commentsDataLocal.comment,
      replies: {
        totalReplies: mergedRepliesData.length,
        data: mergedRepliesData,
        pagination: updatedPagination,
      },
    });
  };

  const handleCommentAdded = () => {
    const newReply = {
      id: 206,
      text: 'Just called the police. They are on their way!',
      posted_by: 'Jane Doe',
      parentId: 101,
      timestamp: 'Feb 23, 1:30 AM',
      user_Img:
        'https://ui.tradeshift.com/v10/dist/components/userimages/assets/jane.png',
    };

    setCommentsDataLocal(prevComment => {
      return {
        ...prevComment,
        replies: {
          totalReplies: prevComment.replies.totalReplies + 1,
          data: [...prevComment.replies.data, newReply],
          pagination: {
            ...prevComment.replies.pagination,
            totalPages: Math.ceil(
              (prevComment.replies.totalReplies + 1) /
                prevComment.replies.pagination.pageSize,
            ),
            currentPage: Math.ceil(
              (prevComment.replies.totalReplies + 1) /
                prevComment.replies.pagination.pageSize,
            ),
          },
        },
      };
    });
   
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView
          style={{flex: 1}}

          // keyboardVerticalOffset={60}
          // behavior={Platform.OS === 'ios' ? 'padding' :}
        >
          <HeaderWithText
            prefixIcon={images.leftArrow}
            prefixStyle={styles.headLeftArrow}
            onPrefixPress={() => {
              props.navigation.goBack();
            }}
            title={strings.comments_details}
          />

          <ComentViewListCompFullScreen
            data={commentsDataLocal}
            props={props}
            onLoadmoreDataCalled={data => {
              
              onClickDataload();
            }}
          />

          <ComentViewTextInputView
            isAutoFocus={true}
            onSubmit={() => {
              handleCommentAdded();
            }}
            onTextChanges={text => {
              console.log('manthahss ', text);
            }}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CommentsAddReply;
