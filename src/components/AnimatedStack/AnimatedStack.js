import { View, StyleSheet, useWindowDimensions } from 'react-native';
import React, { useState, useEffect, } from 'react';
import Card from '../Card/Card';
import NextCard from '../Card/NextCard';
import Empty from '../Card/Empty';
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
  useDerivedValue,
  interpolate,
  withTiming,
 } from 'react-native-reanimated';
import { useNavigation, useRoute, useIsFocused, useFocusEffect } from '@react-navigation/native';
import data from '../../../TinderAssets/assets/data/users2';
import { PanGestureHandler, GestureHandlerRootView, } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch, } from 'react-redux';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';

const AnimatedStack = () => {

  const route = useRoute();
  const isFocused = useIsFocused();
  const stack = useSelector((state) => state.profileStack.value);

  const [currentProfile, setCurrentProfile] = useState(0);

  const fetchProfileData = async (subvalue) => {
    try {
      const foundUser = await DataStore.query(User, u => u.sub("eq", subvalue));
      if (!foundUser) return;
      const d = {
        id: foundUser[0].sub,
        name: foundUser[0].name,
        images: foundUser[0].image,
        bio: foundUser[0].bio,
        age: foundUser[0].age,
        location: foundUser[0].location,
        height: foundUser[0].height,
        bodytype: foundUser[0].bodytype,
        kids: foundUser[0].kids,
        gender: foundUser[0].gender,
        lookingfor: foundUser[0].lookingfor,
        hashtags: foundUser[0].hashtags,
        values: foundUser[0].values,
        language: foundUser[0].language,
      };
      setProfileData(d);
    } catch (e) {
      console.log(e.message);
    }
  }

  const fetchNextProfileData = async (subvalue) => {
    try {
      const foundUser = await DataStore.query(User, u => u.sub("eq", subvalue));
      if (!foundUser) return;
      const d = {
        id: foundUser[0].sub,
        name: foundUser[0].name,
        images: foundUser[0].image,
        bio: foundUser[0].bio,
        age: foundUser[0].age,
        location: foundUser[0].location,
        height: foundUser[0].height,
        bodytype: foundUser[0].bodytype,
        kids: foundUser[0].kids,
        gender: foundUser[0].gender,
        lookingfor: foundUser[0].lookingfor,
        hashtags: foundUser[0].hashtags,
        values: foundUser[0].values,
        language: foundUser[0].language,
      };
      setNextProfileData(d);
    } catch (e) {
      console.log(e.message);
    }
  }

  const [profileData, setProfileData] = useState(null);
  const [nextProfileData, setNextProfileData] = useState(null);


  useEffect(() => {
    if (!stack) return;
    fetchProfileData(stack[currentProfile]);
    fetchNextProfileData(stack[currentProfile + 1]);
  }, [isFocused]);

  useEffect(() => {
    if (!stack[currentProfile]) {
      setProfileData(null);
      return;
    }
    if (nextProfileData) {
      setProfileData(nextProfileData);
    } else {
      fetchProfileData(stack[currentProfile]);
    }
    if (!stack[currentProfile + 1]) {
      setNextProfileData(null);
      return;
    }
    fetchNextProfileData(stack[currentProfile + 1]);
  }, [currentProfile]);

  const LIKE_CARD_TIMER = 500;

  useEffect(() => {
    if (!isFocused) return;
    if (!route.params?.buttonPress) return;

    const { buttonPress } = route.params;
    
    if (buttonPress == 1) {
      translateCardX.value = withTiming(
        hiddenTranslateX, 
        {duration: LIKE_CARD_TIMER},
        () => {
          runOnJS(setCurrentProfile)(currentProfile + 1);
          runOnJS(onLike)();
        }
        );
    }
    if (buttonPress == -1) {
      translateCardX.value = withTiming(
        -hiddenTranslateX, 
        {duration: LIKE_CARD_TIMER},
        () => {
          runOnJS(setCurrentProfile)(currentProfile + 1);
          runOnJS(onNope)();
        }
        );
    }
    route.params.buttonPress = 0;
  }, [isFocused, route.params?.buttonPress]);

  useEffect(() => {
    translateCardX.value = 0;          
  }, [profileData]);

  const onNope = () => {
    console.log('nope');
  }

  const onLike = () => {
    console.log('yep');
  }

  const SWIPE_VELOCITY = 800;
  const { width: screenWidth } = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;


  const translateCardX = useSharedValue(0);
  const rotate = useDerivedValue(() => {
    return (
  interpolate(translateCardX.value, [0, hiddenTranslateX], [0, 30]) + 'deg'
    );
  }, [translateCardX]);

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: translateCardX.value,
    },
    {
      rotate: rotate.value,
    },]
  }));


  const gestureHandler = useAnimatedGestureHandler({
    
    onStart: (_, context) => {
      context.startX = translateCardX.value;
    },
    onActive: (event, context) => {
      translateCardX.value = context.startX + event.translationX;
    },
    onEnd: (event) => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateCardX.value = withSpring(0);
        return;
      }
      translateCardX.value = withTiming(
        hiddenTranslateX * Math.sign(event.velocityX), 
        {duration: 100},
        () => {
          runOnJS(setCurrentProfile)(currentProfile + 1);
        }
      );
      event.velocityX > 0 ? runOnJS(onLike)() : runOnJS(onNope)();
      }
  });

  const nopeIcon = (
      <Entypo
        name="cross"
        size={80}
        color={'white'}
      />
  );

  const likeIcon = (
      <MaterialCommunityIcons
        name="heart"
        size={60}
        color={'white'}
      />
  );

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateCardX.value, 
      [0, hiddenTranslateX / 5], 
      [0, 1])
  }));
  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateCardX.value, 
      [0, -hiddenTranslateX / 5], 
      [0, 1])
  }));
  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: interpolate(translateCardX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1, 0.8, 1])
    }],
    opacity: interpolate(translateCardX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1, 0.7, 1])
  }),[translateCardX]);

  const renderEmptyonBottom = (
    <View style={{position: 'absolute'}}><Empty reset={setCurrentProfile} /></View>
  );
  

  return (
    <GestureHandlerRootView>
      <View style={styles.pagecontainer}>
        {renderEmptyonBottom}
        {nextProfileData ? (
          <Animated.View style={[styles.nextCardContainer, nextCardStyle]} >
            <Card profileData={nextProfileData} />
          </Animated.View>
        ) : (
          null
        )}
        {profileData ? (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.animatedCard, animatedCardStyle]}>
            <Animated.View style={[styles.likeIcons, {backgroundColor: "#f03737",}, likeStyle]} >
              {likeIcon}
            </Animated.View>
            <Animated.View style={[styles.likeIcons, {backgroundColor: 'black',}, nopeStyle]} >
              {nopeIcon}
            </Animated.View>
              <Card profileData={profileData} />            
          </Animated.View>
        </PanGestureHandler>
        ) : ( 
          null
        )}
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  pagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  animatedCard: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  likeIcons: {
    height: 100, 
    width: 100, 
    borderRadius: 50, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderColor: 'black',
    borderWidth: 0.2,
    zIndex: 50,
    position: 'absolute',
  },
});

export default AnimatedStack;