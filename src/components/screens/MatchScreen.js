import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


const MatchScreen = () => {

  return (
      <SafeAreaView style={styles.pageContainer}>
        <Text>Match Screen</Text>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%'
  }
});


export default MatchScreen;