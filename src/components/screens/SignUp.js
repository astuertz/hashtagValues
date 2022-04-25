import React, {useState} from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions, 
  TextInput, 
  Button, 
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import logo from '../../graphics/Values_logo.png';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch, } from 'react-redux';
import { validateUser } from '../../features/counter/userAuthSlice';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const SignUp = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState("MALE");
  const [lookingfor, setLookingFor] = useState("FEMALE");
  const [orientation, setOrientation] = useState('');
  const [relationshiptype, setRelationshipType] = useState("LONGTERM");
  const [relationshipstatus, setRelationshipStatus] = useState("SINGLE");
  
  const onPressSignUp = async () => {
    try {
      await Auth.signUp({username: email, password: password});
      dispatch(validateUser(true));
      navigation.push("EmailConfirm");
    } catch (error) {
        Alert.alert('error signing up:', error.message);
        return;
    }
    Alert.alert('Sign Up Successful!','Please check your email for confirmation code!');
    return;
  }

  const renderLogo = (
    <Image 
    source={logo}
    style={styles.logoSize}  
    resizeMode='contain' 
  />
  );

  const inputElements = (
    <>
    <TextInput 
      placeholder='email'
      value={email}
      onChangeText={setEmail}
      style={styles.textInput} 
    />
    <TextInput 
      placeholder='password'
      value={password}
      onChangeText={setPassword}
      style={styles.textInput}
      secureTextEntry={true} 
    />
    <TouchableOpacity
      onPress={onPressSignUp}  
      style={styles.button} 
    >
      <Text style={styles.buttonText}>Sign Up</Text>
    </TouchableOpacity>
    </>
  );

  return (

    <TouchableWithoutFeedback 
      onPress={() => Keyboard.dismiss()}>
      <View style={styles.pageContainer}>
        <View style={styles.logo}>
          {renderLogo}
        </View>
        <View style={styles.inputContainer} >
          {inputElements}
        </View>     
      </View>
    </TouchableWithoutFeedback>


  );
}

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#cadced',
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    width: '100%',
    height: HEIGHT * .2,
    maxHeight: HEIGHT * .2,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    backgroundColor: '#918b8a',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    overflow: 'hidden',
  },
  logoSize: {
    height: '160%',
  },
  textInput: {
    width: '80%',
    textAlign: 'center',
    backgroundColor: 'white',
    marginBottom: 15,
    fontSize: 20,
  },
  button: {
    width: '80%',
    height: HEIGHT * .06,
    marginVertical: 15,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,

  },
  hyperlink: {
    color: 'blue',  
    fontWeight: "bold",
    fontSize: 20,
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
});

  export default SignUp;