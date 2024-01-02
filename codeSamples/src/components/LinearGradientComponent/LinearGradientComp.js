import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const LinearGradientComp = ({children}) => {
  return (
    <LinearGradient
      locations={[0, 0.5]}
      colors={['#DA1A35', '#1B1B1E']}
      style={{flex: 1}}>
      {children}
    </LinearGradient>
  );
};

export default LinearGradientComp;

const styles = StyleSheet.create({});
