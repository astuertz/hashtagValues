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

//const [gender, sexuality, relationshipType, single] = ['Woman', 'Straight', 'Monogamous', 'Single'];
const [sexuality, relationshipType, single] = ['Straight', 'Monogamous', 'Single'];
//const [height, bodyType] = [`5'4"`, 'Average'];
//const [ethnicity, religion, zodiac, political, employment, education, language] = ['White', 'Christian', 'Libra', 'Politically Conservative', 'Employed full-time', 'Graduate degree', 'English'];
const [ethnicity, religion, zodiac, political, employment, education] = ['White', 'Christian', 'Libra', 'Politically Conservative', 'Employed full-time', 'Graduate degree'];
const [diet, smoking, drinking, drugs] = ['Ketogenic', "Doesn't smoke cigarettes", "Drinks occasionally", "Doesn't use drugs"];
//const [hasKids, hasPets] = ["Doesn't have kids but wants them", "Has cat(s)"];
const hasPets = "Has cat(s)";
//const [lookingFor, datingType] = ["Looking for men", "Long-term dating"];
const datingType = "Long-term dating";
const hasTags = ['#Single', '#Conservative', '#Homesteader', '#JustLooking', '#NoKids', '#SeriousRelationship'];

const ProfileView = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const { 
    name, 
    images, 
    bio, 
    age, 
    location,
    height,
    bodyType,
    gender,
    lookingFor,
    language,
    values,   
    hashtags, 
    buttonsVisible, 
  } = route.params;
  const hasKids = route.params.kids;
  const activeImg = useSelector((state) => state.activeImg.value);
  const dispatch = useDispatch();

  const imagesRef = useRef(null);
  const profileViewisFocused = useIsFocused();

  const [showDetails, setShowDetails] = useState(false);

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
          key={`image ${index}`}
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
        <Text key={`dot ${index}`}
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
      <Text style={{fontSize: 16,}}>Age: {age} ● {location}</Text>
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
      <Text style={styles.profileDetailsText}>Gender: {gender}</Text>
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
      <Text style={styles.profileDetailsText}>Speaks {language}</Text>
    </View>
    <View style={styles.profileDetailsContainer}>
      <Ionicons 
        name="home"
        size={18}
        color={'black'}
      />
      <Text style={styles.profileDetailsText}>Has Kids: {hasKids}</Text>
    </View>
    <View style={styles.profileDetailsContainer}>
      <Ionicons 
        name="search"
        size={18}
        color={'black'}
      />
      <Text style={styles.profileDetailsText}>Looking For:  {lookingFor.map((e, i) => {
        if (i == lookingFor.length - 2) return `${e} OR `;
        if (i != lookingFor.length - 1) return `${e}, `;
        return `${e}`;
      })}</Text>
    </View>
    </>
  );

  const expandButton = (
    <View style={styles.expandButtonContainer} >
      <TouchableOpacity
        onPress={() => setShowDetails(!showDetails)}   
      >
        <MaterialIcons 
          name={showDetails ? ("expand-less") : ("expand-more")}
          size={36}
          color={'black'}
          style={{alignSelf: 'center',}}
        />
      </TouchableOpacity>
    </View>
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
    <Text style={{fontSize: 16, fontWeight: "bold",}}>Values</Text>
    <View style={{flexWrap: 'wrap', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'flex-start',}}>
      {hashtags.length > 0 ? (
        hashtags.map((e, index) => 
        <React.Fragment key={'hashtag' + index}>
          <View style={styles.hashTagContainer} >
            <Text
              style={{color: "#782f2f", fontSize: 14, fontWeight: 'bold',}}
              >
              {e.name}
            </Text>
          </View>
          <View style={{flex: 1, maxWidth: 10,}} />
        </React.Fragment>
        ) 
      ) : (
        <Text style={{color: "#782f2f", fontSize: 14, fontWeight: 'bold',}}>
          This user has not set any values
        </Text>
      )}
    </View>
    <Text style={{fontSize: 14, lineHeight: 0,}}>{"\n"}</Text>
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
          { showDetails ? (
            profileDetails
          ) : (
            null
          )}
          {expandButton}
        </View>
        <View style={styles.secondaryTextContainer} >
          {renderHashTags}
          {renderBioText}
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
      paddingVertical: 5,
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
      padding: 10,
      top: 0,
    },
    profileDetailsText: {
      fontSize: 14, 
      left: 10,
      fontWeight: 'bold',
    },
    hashTagContainer: {
      backgroundColor: 'lightblue',
      padding: 5,
      borderRadius: 25,
      borderColor: 'black',
      borderWidth: 1.5,
      marginTop: 5,
      marginRight: 0,
    },
    expandButtonContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    expandableProfileDetails: {
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',

    },
});

export default ProfileView;