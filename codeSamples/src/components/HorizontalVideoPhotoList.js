import React from 'react';
import { FlatList, Pressable, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

import useStyles from './HorizontalVideoPhotoListStyle';

import { dimens } from '../constants/dimens';

const HorizontalVideoPhotoList = ({
  flatListData = [],
  isHorizontal = true,
}) => {
  const styles = useStyles();
  const { colors } = useTheme();

  const renderMediaView = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => {}}
        style={{
          //   width: dimens.w20,
          //   height: dimens.w20,
          marginHorizontal: index === 0 ? 0 : dimens.w2,

          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: item.name }}
          style={styles.imageStylVideo}
          resizeMode='cover'
        />
      </Pressable>
    );
  };
  return (
    <FlatList
      data={flatListData}
      horizontal={isHorizontal}
      renderItem={renderMediaView}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default HorizontalVideoPhotoList;
