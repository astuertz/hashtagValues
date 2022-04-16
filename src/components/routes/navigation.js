import React, { useState, useEffect, } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen';
import MatchScreen from '../screens/MatchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileView from '../screens/ProfileView';
import LoadingScreen from '../screens/LoadingScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import GalleryScreen from '../screens/GalleryScreen';

const HomeScreenStack = createNativeStackNavigator();
const HomeScreenStackScreen = () => (
    <HomeScreenStack.Navigator screenOptions={{ headerTransparent: true, title: null,}}>
        <HomeScreenStack.Screen name="Home" component={HomeScreen} />
        <HomeScreenStack.Screen name="ProfileView" component={ProfileView} />
    </HomeScreenStack.Navigator>
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
        component={ProfileScreen} 
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
const AuthStackScreen = () => (
    <AuthStack.Navigator screenOptions={{ 
      headerShown: false, 
      }}>
        <AuthStack.Screen name="SignIn" component={SignIn} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
);

const RootStack = createNativeStackNavigator();
const RootStackScreen = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(!isLoading);
            setUser('user');
        }, 2500)
    }, []);

    return (

    <RootStack.Navigator screenOptions={{ 
        animationEnabled: false, 
        headerShown: false, 
        presentation: 'modal',
        }}>
        {isLoading ? (
        <RootStack.Screen name="LoadingScreen" component={LoadingScreen} /> 
        ) : user ? (
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