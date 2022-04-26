import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedStack from '../AnimatedStack/AnimatedStack';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch, } from 'react-redux';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';

const HomeScreen = ({navigation}) => {

  const homeIsFocused = useIsFocused();
  const [profileIsConfig, setProfileIsConfig] = useState(false);
  const sub = useSelector((state) => state.user.sub);

  const queryUser = async () => {
    if (!sub) return;
    const foundUser = await DataStore.query(User, u => u.sub("eq", sub));
    if (foundUser[0]) {
      setProfileIsConfig(true);
    }
    return;
    //if (dbUser.length == 0) return false;
    //return true;
  }

  useEffect(() => {
    queryUser();
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