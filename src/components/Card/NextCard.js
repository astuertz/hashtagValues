import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity, 
    ImageBackground 
  } from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  
  const WIDTH = Dimensions.get("window").width;
  const HEIGHT = Dimensions.get("window").height;
  
  const NextCard = (props) => {
  
    const { name, images, bio, } = props.profileData;
 
    const activeImg = 0;

    const gotoProfileView = () => navigation.push("ProfileView", {
        name: name,
        images: images,
        bio: bio,
        currentProfile: currentProfile,
        });
      
    const renderImages = (
      <View style={[styles.wrap, {flexDirection: 'row', position: 'absolute',}]} >
        <ImageBackground source={{uri: images[0]}} 
            style={styles.wrap}
            resizeMode='stretch'  
            /> 
      </View>
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
      <Text style={{color: 'blue',  fontWeight: "bold",}} >{"\n"}View Profile</Text>
    );
  
    const profileEndBuffer = (
      <View style={{height: 80, width: '100%', flex: 1,}} />
    );
  
    return (
      <View style={styles.pagecontainer}>
        <View style={styles.card}>
        <View style={styles.imagesContainer}>
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
  
  export default NextCard;