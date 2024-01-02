import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';

import {general_String} from '../constants/commonStrings';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

import images from '../constants/images';
import {dimens} from '../constants/dimens';
import useStyles from './SuccessOrErrorModalStyles';
import {strings} from '../constants/Strings';
import ButtonComp from './buttonComponent/ButtonComp';

function SuccessOrErrorModal({
  isModalVisible,
  toggleModal,
  subText,
  isError = false,
  buttonTitle = '',
}) {
  const styles = useStyles();
  const {colors} = useTheme();

  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.modalStyle}
      // animationIn={'fadeIn'}
      // animationOut={'fadeOut'}
      // useNativeDriverForBackdrop={true}
      hideModalContentWhileAnimating={true}
      useNativeDriver
      // transparent={true}
    >
      {/* <BlurView
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}
        blurAmount={0.7}
        blurType="dark"
      /> */}
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              backgroundColor: '#fff',
              // height: dimens.h25,
              width: dimens.w90,
              padding: 20,
              borderRadius: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="center"
              source={images.ic_thumb}
              style={{
                resizeMode: 'center',
                position: 'absolute',

                top: -dimens.h10,
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: dimens.h4,
              }}>
              <Text style={styles.titleText}>
                {isError ? strings.whoops : strings.success}
              </Text>
              <Text style={styles.desText}>{subText}</Text>
            </View>
            <View>
              <ButtonComp
                label={buttonTitle}
                onPress={toggleModal}
                customStyle={{width: dimens.w80}}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default SuccessOrErrorModal;
