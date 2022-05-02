import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedStack from '../AnimatedStack/AnimatedStack';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch, } from 'react-redux';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';
import { updateUsersArray } from '../../features/counter/profileStackSlice';
import { forceUpdate } from '../../features/counter/userAuthSlice';
import LoadingScreen from './LoadingScreen';

const HomeScreen = ({navigation}) => {

  const homeIsFocused = useIsFocused();
  const [profileIsConfig, setProfileIsConfig] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sub = useSelector((state) => state.user.sub);
  const forcedUpdate = useSelector((state) => state.user.forcedUpdate);
  const checkStack = useSelector((state) => state.profileStack.value);
  const [lookingfor, setLookingFor] = useState(null);
  const [gender, setGender] = useState(null);

  const dispatch = useDispatch();

  const queryUser = async () => {
    try {
      if (!sub) return;
      const foundUser = await DataStore.query(User, u => u.sub("eq", sub)).catch();
      if (!foundUser[0]) return;
      setProfileIsConfig(true);
      let lf = foundUser[0].lookingfor;
      setLookingFor(lf);
      let g = foundUser[0].gender;
      setGender(g);
      return;
    } catch (e) {
      console.log(e.message);
    }
  }

  const queryProfileStack = async () => {
    try {
      if (!sub) return;
      const dbUsers = await DataStore.query(User, u => u.sub("ne", sub)).catch();
      if (!dbUsers) return;
      const stack = [];
      for (i=0; i < dbUsers.length; i++) {
        //For Each User != AuthUser.sub
        //Check User.gender == lookingfor of AuthUser
        for (j=0; j < lookingfor.length; j++) {
          let match = (dbUsers[i].gender == lookingfor[j]);
          if (match) {
            //Check that User's gender == dbUser lookingfor
            for(k=0; k < dbUsers[i].lookingfor.length; k++) {
              let matchConfirm = (dbUsers[i].lookingfor[k] == gender); 
              if (matchConfirm) {
                stack.push(dbUsers[i].sub);
              }
            }
            //END
          }
        }
        //END
      }
      dispatch(updateUsersArray(stack));
      return;
    } catch (e) {
      console.log(e.message);
    }
  }

  const updateStack = async () => {
    try {
      await queryUser();
      await queryProfileStack();
      setIsLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    if (forcedUpdate) {
      dispatch(forceUpdate(false));
    }
    updateStack();
  }, [homeIsFocused]);

  return (
      <SafeAreaView style={styles.pageContainer}>
        {!checkStack ? ( <LoadingScreen /> ) : profileIsConfig ? (
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