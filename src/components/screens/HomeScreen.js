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
import Empty from '../Card/Empty';
import queryProfileStack from '../AnimatedStack/updateStack';

const HomeScreen = ({navigation}) => {

  const homeIsFocused = useIsFocused();
  const [profileIsConfig, setProfileIsConfig] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sub = useSelector((state) => state.user.sub);
  //const userStack = useSelector((state) => state.profileStack.value);
  const [userStack, setUserStack] = useState(null);
  const [lookingfor, setLookingFor] = useState(null);
  const [gender, setGender] = useState(null);
  const [resetStack, setResetStack] = useState(1);

  const dispatch = useDispatch();

  const queryUser = async () => {
    try {
      if (!sub) return;
      const foundUser = await DataStore.query(User, u => u.sub("eq", sub));
      if (!foundUser[0]) return;
      setProfileIsConfig(true);
      let lf = foundUser[0].lookingfor;
      setLookingFor(lf);
      let g = foundUser[0].gender;
      setGender(g);
      let s = foundUser[0].stack;
      let stackUnchanged = s.every(item => userStack.includes(item)) && userStack.every(item => s.includes(item));
      if (!stackUnchanged) {
        setUserStack(null);
        setUserStack(s);
      }
      return;
    } catch (e) {
      console.log(e.message);
    }
  }

  const updateStack = async () => {
    queryUser();
    //setUserStack(await queryProfileStack(sub, gender, lookingfor));
  }
  
  useEffect(() => {
    setIsLoading(true);
    updateStack();
    setIsLoading(false);
  }, [homeIsFocused]);

  useEffect(() => {
    if (resetStack == 1) return;
    updateStack();
    setResetStack(1);
  },[resetStack]);

  const loadStack = (
    userStack ? <AnimatedStack stack={userStack} setStack={setUserStack} /> : <Empty reset={setResetStack} />
  );

  const loadedContent = (
    profileIsConfig ? (
      loadStack
    ) : (
      <>
      <Text>Profile is not set up!</Text>
      <Button title="Set Up Your Profile" onPress={() => navigation.navigate("Profile")} />
      </>
    )
  );

  return (
      <SafeAreaView style={styles.pageContainer}>
        {isLoading ? ( 
          <LoadingScreen /> 
        ) : (
          loadedContent
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