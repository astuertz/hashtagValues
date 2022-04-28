import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedStack from '../AnimatedStack/AnimatedStack';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch, } from 'react-redux';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';
import { updateUsersArray } from '../../features/counter/profileStackSlice';

const HomeScreen = ({navigation}) => {

  const homeIsFocused = useIsFocused();
  const [profileIsConfig, setProfileIsConfig] = useState(false);
  const sub = useSelector((state) => state.user.sub);
  const dispatch = useDispatch();

  const queryUser = async () => {
    if (!sub) return;
    const foundUser = await DataStore.query(User, u => u.sub("eq", sub));
    if (foundUser[0]) {
      setProfileIsConfig(true);
    }
    return;
  }

  const queryProfileStack = async () => {
    if (!sub) return;
    const dbUsers = await DataStore.query(User, u => u.sub("ne", sub));
    let stack = [];
    for (i=0; i < dbUsers.length; i++) {
      stack[i] = dbUsers[i].sub;
    }
    dispatch(updateUsersArray(stack));
    return;
  }

  useEffect(() => {
    queryUser();
    queryProfileStack();
  }, [homeIsFocused]);

  return (
      <SafeAreaView style={styles.pageContainer}>
        {profileIsConfig ? (
          <AnimatedStack />
        ) : (
          <>
          <Text>Profile is not set up!</Text>
          <Button title="Set Up Your Profile" onPress={() => navigation.navigate("Profile")} />
          </>
        )}
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
    width: '100%',
    height: '100%',
  }
});


export default HomeScreen;