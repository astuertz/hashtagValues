import React, {useState, useEffect} from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  Button, 
  Alert, 
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch, } from 'react-redux';
import { signOutUser } from '../../features/counter/userAuthSlice';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ProfileScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const sub = useSelector((state) => state.user.sub);
  const profileScreenIsFocused = useIsFocused();
  const [profPicture, setProfPicture] = useState('https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg');
  const [images, setImages] = useState([]);
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState(42);
  const [location, setLocation] = useState('location');
  const [height, setHeight] = useState(null);
  const [bodytype, setBodyType] = useState(null);
  const [kids, setKids] = useState(null);
  const [gender, setGender] = useState(null);
  const [lookingfor, setLookingFor] = useState(null);
  const [hashtags, setHashtags] = useState(null);
  const [values, setValues] = useState(null);
  const [language, setLanguage] = useState(null);
  
  const fetchUserData = async () => {
    try {
      let u = await DataStore.query(User, u => u.sub("eq", sub));
      if (!u[0]) return;
      let pp = u[0].image[0];
      setProfPicture(pp);
      setImages(u[0].image);
      setBio(u[0].bio);
      setName(u[0].name);
      setAge(u[0].age);
      setLocation(u[0].location);
      setHeight(u[0].height);
      setBodyType(u[0].bodytype);
      setKids(u[0].kids);
      setGender(u[0].gender);
      setLookingFor(u[0].lookingfor);
      setHashtags(u[0].hashtags);
      setValues(u[0].values);
      setLanguage(u[0].language);
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    fetchUserData();
  },[profileScreenIsFocused]);

  const onSignOut = async () => {
    try {
        await Auth.signOut();
        dispatch(signOutUser());
    } catch (error) {
        Alert.alert('error signing out: ', error.message);
        return;
    }
    Alert.alert('Sign Out Successful!');
  }

  const header = (
    <View style={styles.header} >
    <Text 
      style={styles.hyperlink} 
      onPress={onSignOut} 
    >Sign Out</Text>
  </View>
  );

  const profilePicture = (
    <View style={styles.profilePictureContainer} >
      <TouchableOpacity
        onPress={() => navigation.push("UserProfile", {
          name: name,
          images: images,
          bio: bio,
          age: age,
          location: location,
          height: height,
          bodyType: bodytype,
          kids: kids,
          gender: gender,
          lookingFor: lookingfor,
          hashtags: hashtags,
          values: values,
          language: language,
          buttonsVisible: false,
          })}
      >
        <Image source={{uri: profPicture}} style={styles.profilePicture} />
      </TouchableOpacity>
      <View style={{flex: 1,}} />
      <TouchableOpacity 
        onPress={() => navigation.push("ProfileSetup")}
        style={styles.buttonSetup}
      >
      <Text style={styles.buttonText}>Setup Profile</Text>
      </TouchableOpacity>
    </View>
  );

  const body = (
    <View style={styles.inputContainer}>
      {profilePicture}
    </View>
  );

  return (
    <SafeAreaView style={styles.pageContainer}>
      {header}
      {body}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: 'darkgrey',
  },
  header: {
    height: HEIGHT * .05,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'grey',
    borderColor: 'black',
    borderBottomWidth: 1,
    padding: 5,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    marginTop: 3,
  },
  profilePictureContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    height: HEIGHT * .25,
    width: '100%',
    backgroundColor: '#dfe0e6',
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderRightColor: 'blue',
    borderLeftColor: 'blue',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: 'black',
    borderWidth: 5,
  },
  hyperlink: {
    color: 'blue',  
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 5,
  },
  textInput: {
    width: WIDTH * .8,
    textAlign: 'center',
    backgroundColor: 'white',
    marginBottom: 15,
    fontSize: 20,
  },
  buttonSetup: {
    height: 50,
    width: 150,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderBottomColor: 'black',
    borderWidth: 2,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  buttonInActive: {
    height: 50,
    width: 150,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderBottomColor: 'black',
    borderWidth: 2,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',  
    fontWeight: "bold",
    fontSize: 20,
    textShadowColor: 'black',
    textShadowRadius: 25,
    textShadowOffset: {
      width: .5,
      height: .5,
    },
  },
  buttonRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#575b61',
    padding: 10,
    borderRadius: 25,
    margin: 5,
  },
  plainText: {
    color: '#75326b',  
    fontWeight: "bold",
    fontSize: 20,
    marginHorizontal: 5,
    marginBottom: 5,
  },
});


export default ProfileScreen;