import React from 'react';
import {View, Text, StyleSheet, Button, Alert,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch, } from 'react-redux';
import { signOutUser } from '../../features/counter/userAuthSlice';

const ProfileScreen = () => {

  const dispatch = useDispatch();

  const onSignOut = async () => {
    try {
        await Auth.signOut();
        dispatch(signOutUser());
    } catch (error) {
        Alert.alert('error signing out: ', error.message);
        return;
    }
    Alert.alert('Sign Out Successful!');
  }

  return (
      <SafeAreaView style={styles.pageContainer}>
        <Text>ProfileScreen</Text>
        <Button title="Sign Out" onPress={onSignOut} />
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


export default ProfileScreen;