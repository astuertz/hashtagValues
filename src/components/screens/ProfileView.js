import { View, Text, Button, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, } from 'react-native';
import React, { useState, useEffect, useRef, } from 'react';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch, } from 'react-redux';
import { increment, decrement, incrementByAmount, reset, setToAmount } from '../../features/counter/activeImgSlice';


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const [gender, sexuality, relationshipType, single] = ['Woman', 'Straight', 'Monogamous', 'Single'];
const [height, bodyType] = [`5'4"`, 'Average'];
const [ethnicity, religion, zodiac, political, employment, education, language] = ['White', 'Christian', 'Libra', 'Politically Conservative', 'Employed full-time', 'Graduate degree', 'English'];
const [diet, smoking, drinking, drugs] = ['Ketogenic', "Doesn't smoke cigarettes", "Drinks occasionally", "Doesn't use drugs"];
const [hasKids, hasPets] = ["Doesn't have kids but wants them", "Has cat(s)"];
const [lookingFor, datingType] = ["Looking for men", "Long-term dating"];
const hasTags = ['#Single', '#Conservative', '#Homesteader', '#JustLooking', '#NoKids', '#SeriousRelationship'];

const ProfileView = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const { name, images, bio, buttonsVisible, } = route.params;
  const activeImg = useSelector((state) => state.activeImg.value);
  const dispatch = useDispatch();

  const imagesRef = useRef(null);
  const profileViewisFocused = useIsFocused();

  useEffect(() => {
    imagesRef.current?.scrollTo({x: WIDTH * activeImg, animated: false});
  }, [activeImg]);

  onchange = ({nativeEvent}) => {
    if (!nativeEvent) return;
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    dispatch(setToAmount(slide));
  };

  onended = () => {
      navigation.push("Gallery", {
        images: images,
      });
  };

  const onNope2 = () => {
    navigation.navigate({
      name: "Home",
      params: {
        name: name,
        bio: bio,
        images: images,
        buttonPress: -1,
      },
      merge: true,
    });
  }

  const onLike2 = () => {
    navigation.navigate({
      name: "Home",
      params: {
        name: name,
        bio: bio,
        images: images,
        buttonPress: 1,
      },
      merge: true,
    });
  }

  const imagesScrollView = (
    <ScrollView onScroll={({nativeEvent}) => onchange({nativeEvent})}
    onTouchEnd={({nativeEvent}) => onended({nativeEvent})}
    showsHorizontalScrollIndicator={false}
    pagingEnabled
    horizontal
    ref={imagesRef}
    style={styles.wrap}
  >
    {
      images.map((e, index) => 
        <Image source={{uri: e}} 
          style={styles.wrap}
          key={e}
          resizeMode='stretch'  
          />
      )
    }
  </ScrollView>
  );

  const imagesScrollViewDots = (
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

  const renderBioText = (
    <>
    <Text style={{fontSize: 16, fontWeight: "bold",}}>My Self Summary</Text>
    <Text style={{fontSize: 14,}}>{"\n"}{bio}</Text>
    </>
  );

  const profileDetails = (
    <>
    <View style={styles.profileDetailsContainer}>
      <AntDesign 
        name="user"
        size={18}
        color={'black'}
      />
      <Text style={styles.profileDetailsText}>{gender} | {sexuality} | {relationshipType} | {single}</Text>
    </View>
    <View style={styles.profileDetailsContainer}>
      <MaterialIcons 
        name="fitness-center"
        size={18}
        color={'black'}
      />
      <Text style={styles.profileDetailsText}>{height} | {bodyType}</Text>
    </View>
    <View style={styles.profileDetailsContainer}> 
      <Fontisto 
        name="world-o"
        size={18}
        color={'black'}
      /> 
      <Text style={styles.profileDetailsText}>
      {ethnicity} | {religion} | {zodiac} | {political} | {employment} | {education} | Speaks {language}
      </Text>
    </View>
    <View style={styles.profileDetailsContainer}>
      <MaterialCommunityIcons 
        name="food-apple-outline"
        size={18}
        color={'black'}
      />
      <Text style={styles.profileDetailsText}>{diet} | {smoking} | {drinking} | {drugs}</Text>
    </View>
    <View style={styles.profileDetailsContainer}>
      <Ionicons 
        name="home"
        size={18}
        color={'black'}
      />
      <Text style={styles.profileDetailsText}>{hasKids} | {hasPets}</Text>
    </View>
    <View style={styles.profileDetailsContainer}>
      <Ionicons 
        name="search"
        size={18}
        color={'black'}
      />
      <Text style={styles.profileDetailsText}>{lookingFor} | {datingType}</Text>
    </View>
    </>
  );

  const profileEndBuffer = (
    <View style={{height: 80, width: '100%', flex: 1,}} />
  );

  const floatingNopeButton = (
    <TouchableOpacity 
    onPress={() => onNope2()}
    style={[styles.floatingLikeButtons, {right: 50, backgroundColor: "#e9f3ff",}]}
    >
      <Entypo
        name="cross"
        size={40}
        color={'black'}
      />
    </TouchableOpacity>
  );

  const floatingLikeButton = (
    <TouchableOpacity 
    onPress={() => onLike2()}
    style={[styles.floatingLikeButtons, {left: 50, backgroundColor: "#f03737",}]}
    >
      <MaterialCommunityIcons
        name="heart"
        size={30}
        color={'white'}
      />
    </TouchableOpacity>
  );

  const renderHashTags = (
    <>
    <Text style={{fontSize: 14, lineHeight: 0,}}>{"\n"}</Text>
    <View style={{flexWrap: 'wrap', justifyContent: 'flex-start', flexDirection: 'row',}}>
      {
        hasTags.map((e, index) => 
          <Text
            key={e}
            style={{color: "#782f2f", fontSize: 14,}}
            >
            {e}{" "}
            </Text>
        ) 
      }
    </View>
    </>
  );

  return (
    <View style={styles.pagecontainer}>
      <ScrollView>
        <View style={styles.wrap}>
          {imagesScrollView}
          {imagesScrollViewDots}
        </View>

        <View style={styles.textContainer}>
          <View style={styles.headerContainer}>
            {textHeader}            
          </View>
          {profileDetails}
        </View>
        <View style={styles.secondaryTextContainer} >
            {renderBioText}
            {renderHashTags}
            {profileEndBuffer}
        </View>
      </ScrollView>
      {buttonsVisible ? (
        <View style={styles.floatingLikeButtonsContainer}>
        {floatingNopeButton}
        {floatingLikeButton}
      </View>
      ) : 
      null
      }
    </View>
  )
}

const styles = StyleSheet.create({
    pagecontainer: {
      flex: 1, 
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    card: {
      borderRadius: 10,
      overflow: 'hidden',
      flex: 1, 
      height: '100%',
      width: '100%',
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
      paddingVertical: 0,
      paddingHorizontal: 15,
      flexWrap: 'wrap',
    },
    headerContainer: {
      flexDirection: 'row',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      paddingVertical: 10,
    },
    profileDetailsContainer: {
      paddingVertical: 10,
      paddingHorizontal: 0,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
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
      borderWidth: 0.2,
    },
    secondaryTextContainer: {
      backgroundColor: "#dfe0e6", 
      padding: 15,
    },
    profileDetailsText: {
      fontSize: 14, 
      left: 10,
    },
    hashTagContainer: {
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 25,
      borderColor: 'black',
      borderWidth: 1.5,
      top: 10,
    },
});

export default ProfileView;