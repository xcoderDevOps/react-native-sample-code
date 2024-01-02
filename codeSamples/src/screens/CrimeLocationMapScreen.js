import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CrimeLocationMap} from '../features/CrimeMap';

const CrimeLocationMapScreen = props => {
  return <CrimeLocationMap props={props} />;
};

export default CrimeLocationMapScreen;

const styles = StyleSheet.create({});
