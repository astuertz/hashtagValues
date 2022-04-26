import React, {useState} from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch, } from 'react-redux';
import { signOutUser } from '../../features/counter/userAuthSlice';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ProfileScreen = ({ navigation }) => {

  const dispatch = useDispatch();

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

  return (
    <SafeAreaView style={styles.pageContainer}>
      <>
      <View style={styles.header} >
        <Text 
          style={styles.hyperlink} 
          onPress={onSignOut} 
        >Sign Out</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text>Profile Screen</Text>
        <Button title="Setup Profile" onPress={() => navigation.push("ProfileSetup")} />
      </View>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  pageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: "#dfe0e6",
  },
  header: {
    height: HEIGHT * .05,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'grey',
    marginBottom: 15,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
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
  buttonActive: {
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