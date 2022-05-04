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
      //dispatch(updateUsersArray(s));
      setUserStack(s);
      /*
      ~~Saving this here to search 'values'~~
      let test = foundUser[0].values;
      var index = test.findIndex(function(item){
        return item.weight === 100
      });
      console.log(index);
      */
      return;
    } catch (e) {
      console.log(e.message);
    }
  }

  const queryProfileStack = async () => {
    try {
      if (!sub) return;
      const dbUsers = await DataStore.query(User, u => u.sub("ne", sub).lookingfor("contains", gender));
      if (!dbUsers) return;
      const stack = [];
      for (i=0; i < dbUsers.length; i++) {
        if (lookingfor.indexOf(dbUsers[i].gender) >= 0) {
          stack.push(dbUsers[i].sub);
        }
      }
      //dispatch(updateUsersArray(stack));
      let dbU = await DataStore.query(User, u => u.sub("eq", sub));
      let u = dbU[0];
      await DataStore.save(User.copyOf(u, updated => {
        updated.stack = stack;
      }));
      setUserStack(stack);
      return;
    } catch (e) {
      console.log(e.message);
    }
  }

  const updateStack = () => {
    queryUser();
    queryProfileStack();
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