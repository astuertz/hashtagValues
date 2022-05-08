import React, { useState, useEffect, } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Auth, Hub } from 'aws-amplify';
import { useSelector, useDispatch, } from 'react-redux';
import { validateUser, confirmUser, updateSub, forceUpdate, } from '../../features/counter/userAuthSlice';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import MatchScreen from '../screens/MatchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileView from '../screens/ProfileView';
import LoadingScreen from '../screens/LoadingScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import GalleryScreen from '../screens/GalleryScreen';
import EmailConfirmation from '../screens/EmailConfirmation';
import ProfileSetup from '../screens/ProfileSetup';
import ValuesScreen from '../screens/ValuesScreen';

import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';
import { updateUsersArray } from '../../features/counter/profileStackSlice';
import { getImageSourceProperties } from 'react-native/Libraries/Image/ImageSource';

const HomeScreenStack = createNativeStackNavigator();
const HomeScreenStackScreen = () => (
    <HomeScreenStack.Navigator screenOptions={{ headerTransparent: true, title: null,}}>
        <HomeScreenStack.Screen name="Home" component={HomeScreen} />
        <HomeScreenStack.Screen name="ProfileView" component={ProfileView} />
    </HomeScreenStack.Navigator>
);

const ProfileScreenStack = createNativeStackNavigator();
const ProfileScreenStackScreen = () => (
    <ProfileScreenStack.Navigator screenOptions={{ headerTransparent: true, title: null, headerShown: false,}}>
        <ProfileScreenStack.Screen name="ProfileScreen" component={ProfileScreen} />
        <ProfileScreenStack.Screen name="ProfileSetup" component={ProfileSetup} />
        <ProfileScreenStack.Screen name="UserProfile" component={ProfileView} />
        <ProfileScreenStack.Screen name="ValuesScreen" component={ValuesScreen} />
    </ProfileScreenStack.Navigator>
);

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
    <AppTabs.Navigator screenOptions={{
        headerShown: false,
    }}>
        <AppTabs.Screen 
        name="HomeScreen" 
        component={HomeScreenStackScreen} 
        options={{
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            name="account-box-multiple-outline"
            size={props.size}
            color={props.color}
          />
        ),
      }}
        />
        <AppTabs.Screen 
        name="Match" 
        component={MatchScreen} 
        options={{
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            name="cards-heart-outline"
            size={props.size}
            color={props.color}
          />
        ),
      }}    
        />
        <AppTabs.Screen 
        name="Profile" 
        component={ProfileScreenStackScreen} 
        options={{
        tabBarIcon: (props) => (
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={props.size}
            color={props.color}
          />
        ),
      }}       
        />
    </AppTabs.Navigator>
);

const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => {
  
  return (
    <AuthStack.Navigator screenOptions={{ 
      headerShown: false, 
      }}>
        <AuthStack.Screen name="SignIn" component={SignIn} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
        <AuthStack.Screen name="EmailConfirm" component={EmailConfirmation} />
    </AuthStack.Navigator>
  );
};

const RootStack = createNativeStackNavigator();
const RootStackScreen = () => {

  const user = useSelector((state) => state.user.value);
  const isConfirmed = useSelector((state) => state.user.isConfirmed);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const getAuth = async () => {
    try {
      let u = await Auth.currentAuthenticatedUser();
      dispatch(validateUser(true));
      if (!u) return;
      let s = u.attributes.sub;
      if (!s) return;
      dispatch(updateSub(s));
      if (u.attributes.email_verified) {
        dispatch(confirmUser());
      }
      return s;
    } catch (e) {
      console.log(e.message);
    }
  }

  const [datastoreIsReady, setDatastoreIsReady] = useState(false);
  // Create listener
  const listener = Hub.listen("datastore", async hubData => {
    const  { event, data } = hubData.payload;
    if (event === "ready") {
      setDatastoreIsReady(true);
      console.log('Datastore is ready!');
    }
  });

  const loading = () => {
    getAuth();
    setIsLoading(false);
  }

  useEffect(() => {
    if (!datastoreIsReady) return;
    listener();
    loading();   
  }, [datastoreIsReady]); 

  return (

  <RootStack.Navigator screenOptions={{ 
      animationEnabled: false, 
      headerShown: false, 
      presentation: 'modal',
      }}>
      {isLoading ? (
      <RootStack.Screen name="LoadingScreen" component={LoadingScreen} /> 
      ) : user && isConfirmed ? (
      <RootStack.Screen name="AppTabs" component={AppTabsScreen} /> 
      ) : (
      <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen} />
      )}
      <RootStack.Screen name="Gallery" component={GalleryScreen} options={{ 
        animationEnabled: true, 
        cardStyle: { 
          backgroundColor: 'black', 
        }, 
      }}/>
  </RootStack.Navigator>
  );
};

export default () => {

  return (
  <NavigationContainer>
      <RootStackScreen />
  </NavigationContainer>
  );
};