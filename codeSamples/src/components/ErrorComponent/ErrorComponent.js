import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useStyles from './ErrorComponentStyle';

const ErrorComponent = ({errorText}) => {
  const styles = useStyles();
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.emailErrorStyle}>{errorText}</Text>
    </View>
  );
};

export default ErrorComponent;

const styles = StyleSheet.create({});
