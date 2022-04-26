import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Navigation from './src/components/routes/navigation';
import Amplify from "@aws-amplify/core";
import {DataStore} from "@aws-amplify/datastore";
import config from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

DataStore.configure(config);

const App = () => {

  return (
    <View style={styles.root}>
      <Navigation />
    </View>
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
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: '15%',
    padding: 10
  }
});


export default App;