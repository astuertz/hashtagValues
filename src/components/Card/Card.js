import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  ImageBackground 
} from 'react-native';
import React, {useState, useEffect} from 'react';
import { useNavigation, useRoute, useIsFocused, useFocusEffect } from '@react-navigation/native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch, } from 'react-redux';
import { increment, decrement, incrementByAmount, reset, } from '../../features/counter/activeImgSlice';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Card = (props) => {

  const { name, images, bio, } = props.profileData;
  const cardIsFocused = useIsFocused();
  const activeImg = useSelector((state) => state.activeImg.value);
  const dispatch = useDispatch();

  const gotoProfileView = () => navigation.push("ProfileView", {
    name: name,
    images: images,
    bio: bio,
    buttonsVisible: true,
    });

  useEffect(() => {
    if (!cardIsFocused) return;
    dispatch(reset());
    translateImagesX.value = 0;
  }, [props.profileData]);


  const navigation = useNavigation();

  useEffect(() => {
    translateImagesX.value = activeImg * -WIDTH;
  }, [activeImg]);

  onRight = () => {
    if (activeImg == images.length - 1) return;
    translateImagesX.value = translateImagesX.value - WIDTH;
    dispatch(increment());
  };

  onLeft = () => {
    if (activeImg == 0) return;
    translateImagesX.value = translateImagesX.value + WIDTH;
    dispatch(decrement());
  };

  const translateImagesX = useSharedValue(0);

  const animatedImgStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: translateImagesX.value
    }]
  }));

  const touchableOverlay = (
    <>
    <TouchableOpacity style={[styles.touchable, {}]}  onPress={() => onLeft()} />
    <TouchableOpacity style={[styles.touchable, {}]} />
    <TouchableOpacity style={[styles.touchable, {}]} onPress={() => onRight()} />
    </>
  );

  const renderImages = (
    <Animated.View style={[styles.wrap, animatedImgStyle, {flexDirection: 'row', position: 'absolute',}]} >
    {
      images.map((e, index) =>
        <ImageBackground source={{uri: e}} 
          style={styles.wrap}
          key={e}
          resizeMode='stretch'  
          /> 
      )
    }
    </Animated.View>
  );

  const renderImagesDots = (
    <View style={styles.wrapDot}>
    {
      images.map((e, index) =>
        <Text key={e}
        style={activeImg == index ? styles.dotActive : styles.dotInactive}>
          ●
        </Text>  
      )
    }
  </View>
  );

  const textHeader = (
    <View style={{flex: 1,}}>
      <Text style={{fontSize: 20, fontWeight: "bold",}}>{name}</Text>
      <Text style={{fontSize: 16,}}>Age: 42 ● Los Angeles, California</Text>
    </View>
  );

  const clickablePercentButton = (
    <TouchableOpacity style={styles.percentContainer}
    onPress={gotoProfileView} >          
      <MaterialCommunityIcons
          name="percent"
          size={24}
          color={'black'}
      />
    </TouchableOpacity>
  );


  const renderBioText = (
    <>
    <Text style={{fontSize: 16, fontWeight: "bold",}}>{"\n"}My Self Summary</Text>
    <Text style={{fontSize: 14,}}>{"\n"}{bio}</Text>
    </>
  );

  const viewProfileLink = (
    <Text style={{color: 'blue',  fontWeight: "bold",}} onPress={gotoProfileView}>{"\n"}View Profile</Text>
  );

  const profileEndBuffer = (
    <View style={{height: 80, width: '100%', flex: 1,}} />
  );

  return (
    <View style={styles.pagecontainer}>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.imagesContainer}>
            {touchableOverlay}
            {renderImages}
            {renderImagesDots}
          </View>
          <View style={styles.textContainer}>
            <View style={styles.headerContainer}>
              {textHeader}
              {clickablePercentButton}
            </View>
            {renderBioText}
            {viewProfileLink}
            {profileEndBuffer}        
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    pagecontainer: {
      flex: 1, 
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
    },
    touchable: {
      width: WIDTH / 3,
      height: '100%',
      zIndex: 100,
    },
    card: {
      width: '100%',
      height: '100%',
      flex: 1,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.7,
      shadowRadius: 6.68,
  
      elevation: 11,
      backgroundColor: "#E8E8E8",
      overflow: 'hidden',
    },
    wrap: {
      height: HEIGHT * .5,
      width: WIDTH,
    },
    wrapDot: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      alignSelf: 'center',
      zIndex: 10,
    },
    dotActive: {
      margin: 3,
      color: 'black',
    },
    dotInactive: {
      margin: 3,
      color: 'white',
    },
    textContainer: {
      flex: 1, 
      padding: 15,
    },
    headerContainer: {
      flexDirection: 'row',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      paddingVertical: 10,
    },
    percentContainer: {
      alignItems: 'center', 
      justifyContent: 'center', 
      width: 46,
      height: 46,
      right: 10,
      backgroundColor: 'white',
      borderRadius: 23,
      borderColor: 'blue',
      borderWidth: 3,
    },
    imagesContainer: {
      flexDirection: 'row', 
      justifyContent: 'center',
      height: HEIGHT * .5,
      width: WIDTH,
    },
    floatingLikeButtonsContainer: {
      flexDirection: 'row', 
      position: 'absolute', 
      justifyContent: 'center', 
      bottom: 10, 
      height: 50, 
      width: '100%',
    },
    floatingLikeButtons: {
      height: 50, 
      width: 50, 
      borderRadius: 25, 
      justifyContent: 'center', 
      alignItems: 'center', 
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 1.00,
      shadowRadius: 16.00,

      elevation: 24,
      borderColor: 'black',
      borderWidth: 0.0,
    },
});

export default Card;