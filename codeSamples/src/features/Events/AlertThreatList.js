import {View, Text, Image, FlatList} from 'react-native';
import React from 'react';
import useStyles from './AlertThreatListStyle';
import CommonStyles from '../CommonStyles';
import {useTheme} from '@react-navigation/native';
import {EventDetailsData} from '../../utilities/DummyResponseData';
import {dimens} from '../../constants/dimens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../constants/images';
import font from '../../constants/font';

const AlertThreatList = ({}) => {
  const commonStyles = CommonStyles();
  const styles = useStyles();
  const {colors} = useTheme();
  const renderItemAlertThreat = (item, index) => {
    return (
      <View style={styles.container}>
        {/* first row */}
        <View
          style={[
            styles.viewMain,
            // {marginVertical: index == 0 ? dimens.h2 :0},
          ]}>
          <View style={styles.view2}>
            <Image
              source={{uri: item.created_by.avatar}}
              style={styles.imageStyl}
              resizeMode="cover"
            />
            <View
              style={{
                position: 'absolute',
                bottom: -10,
              }}>
              <Image
                source={images.verified_green}
                style={styles.imageStylVerified}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={{marginStart: dimens.w2}}>
            <View style={commonStyles.flex_direction_row}>
              <Text style={commonStyles.subTitlesNbuttons}>
                {item.created_by.name}
              </Text>
              <Text style={[commonStyles.body1, {color: colors.black60}]}>
                {' - '}
              </Text>
              <Text
                style={[
                  commonStyles.subTitlesNbuttons,
                  {fontFamily: font.Body1_Inter_Regular},
                ]}>
                {item.created_by.role.name}
              </Text>
            </View>
            <Text style={[commonStyles.body1, {color: colors.black30}]}>
              {item.created_at}
            </Text>
          </View>
        </View>

        <View
          style={[
            commonStyles.flex_direction_row,
            {marginBottom: dimens.h2, alignItems: 'center'},
          ]}>
          <Image
            source={
              item.alert_type == 'alert' ? images.speaker_red : images.handRed
            }
            style={styles.imageStylVerified}
            resizeMode="contain"
          />
          <Text
            style={[
              commonStyles.subTitlesNbuttons,
              {textTransform: 'capitalize', marginStart: dimens.w2},
            ]}>
            {item.alert_type}
          </Text>
        </View>
        <Text style={commonStyles.body1}>{item.details}</Text>
        <View
          style={{
            backgroundColor: colors.black20,
            width: dimens.w92,
            height: dimens.ho1,
            alignSelf: 'center',
            marginTop: dimens.h2,
          }}
        />
      </View>
    );
  };
  return (
    <FlatList
      data={EventDetailsData.incident_alert}
      renderItem={({item, index}) => {
        return renderItemAlertThreat(item, index);
      }}
    />
  );
};

export default AlertThreatList;
