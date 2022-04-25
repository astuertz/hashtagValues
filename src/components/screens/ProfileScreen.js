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

/*
<TextInput 
      placeholder='name'
      value={name}
      onChangeText={setName}
      style={styles.textInput}
    />
    <TextInput 
      style={styles.textInput}
      placeholder="Bio..."
      multiline={true}
      numberOfLines={3}
      value={bio}
      onChangeText={setBio}
    />
    <TextInput 
      placeholder='orientation'
      value={orientation}
      onChangeText={setOrientation}
      style={styles.textInput}
    />
    <View style={{justifyContent: 'flex-start', alignItems: 'flex-start',}}>
      <Text>GENDER:</Text>
      <Picker
        style={{ height: 50, width: 150, borderRadius: 20, backgroundColor: 'white', marginHorizontal: 10, marginVertical: 15,}}
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) =>
          setGender(itemValue)
      }>
        <Picker.Item label="Male" value="MALE" />
        <Picker.Item label="Female" value="FEMALE" />
        <Picker.Item label="Other" value="OTHER" />
      </Picker>
    </View>
    <View style={{justifyContent: 'flex-start', alignItems: 'flex-start',}}>
      <Text>LOOKING FOR:</Text>
      <Picker
        style={{ height: 50, width: 150, borderRadius: 20, backgroundColor: 'white', marginHorizontal: 10, marginVertical: 15,}}
        selectedValue={lookingfor}
        onValueChange={(itemValue, itemIndex) =>
            setLookingFor(itemValue)
      }>
        <Picker.Item label="Female" value="FEMALE" />
        <Picker.Item label="Male" value="MALE" />
        <Picker.Item label="Other" value="OTHER" />
      </Picker>
    </View>
    <View style={{justifyContent: 'flex-start', alignItems: 'flex-start',}}>
      <Text>DESIRED RELATOINSHIP:</Text>
      <Picker
        style={{ height: 50, width: 150, borderRadius: 20, backgroundColor: 'white', marginHorizontal: 10, marginVertical: 15,}}
        selectedValue={relationshiptype}
        onValueChange={(itemValue, itemIndex) =>
            setRelationshipType(itemValue)
      }>
        <Picker.Item label="Long-Term" value="LONGTERM" />
        <Picker.Item label="Friends" value="FRIENDS" />
        <Picker.Item label="Hookup" value="HOOKUP" />
      </Picker>
    </View>
    <View style={{justifyContent: 'flex-start', alignItems: 'flex-start',}}>
      <Text>RELATIONSHIP STATUS:</Text>
      <Picker
        style={{ height: 50, width: 150, borderRadius: 20, backgroundColor: 'white', marginHorizontal: 10, marginVertical: 15,}}
        selectedValue={relationshipstatus}
        onValueChange={(itemValue, itemIndex) =>
            setRelationshipStatus(itemValue)
      }>
        <Picker.Item label="Single" value="SINGLE" />
        <Picker.Item label="Partnered" value="PARTNERED" />
      </Picker>
    </View>
*/

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ProfileScreen = () => {

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

  const [name, setName] = useState('');
  const [gender, setGender] = useState('MALE');
  // [Male, Female, Trans Women, Trans Men, Other]
  const [lookingfor, setLookingFor] = useState([false, false, false, false, false]);

  const nameElement = (
    <>
    <Text style={styles.plainText} >What is your name?</Text>
    <TextInput 
      placeholder='name'
      value={name}
      onChangeText={setName}
      style={styles.textInput} 
    />
    </>
  );

  const genderElement = (
    <>
    <Text style={styles.plainText} >What is your gender?</Text>
    <View style={styles.buttonRow} >
      <TouchableOpacity 
        style={gender == 'MALE' ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setGender('MALE')}
      >
        <Text style={styles.buttonText}>Male</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={gender == 'FEMALE' ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setGender('FEMALE')}
      >
        <Text style={styles.buttonText}>Female</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={gender == 'TRANSMALE' ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setGender('TRANSMALE')}
      >
        <Text style={styles.buttonText}>Trans Male</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={gender == 'TRANSFEMALE' ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setGender('TRANSFEMALE')}
      >
        <Text style={styles.buttonText}>Trans Female</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={gender == 'OTHER' ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setGender('OTHER')}
      >
        <Text style={styles.buttonText}>Other</Text>
      </TouchableOpacity>
    </View>
    </>
  );

  const lookingForElement = (
    <>
    <Text style={styles.plainText} >What genders will you date?</Text>
    <View style={styles.buttonRow} >
      <TouchableOpacity 
        style={lookingfor[0] ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setLookingFor([!lookingfor[0],lookingfor[1],lookingfor[2],lookingfor[3],lookingfor[4]])}
      >
        <Text style={styles.buttonText}>Male</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={lookingfor[1] ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setLookingFor([lookingfor[0],!lookingfor[1],lookingfor[2],lookingfor[3],lookingfor[4]])}
      >
        <Text style={styles.buttonText}>Female</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={lookingfor[2] ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setLookingFor([lookingfor[0],lookingfor[1],!lookingfor[2],lookingfor[3],lookingfor[4]])}
      >
        <Text style={styles.buttonText}>Trans Male</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={lookingfor[3] ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setLookingFor([lookingfor[0],lookingfor[1],lookingfor[2],!lookingfor[3],lookingfor[4]])}
      >
        <Text style={styles.buttonText}>Trans Female</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={lookingfor[4] ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setLookingFor([lookingfor[0],lookingfor[1],lookingfor[2],lookingfor[3],!lookingfor[4]])}
      >
        <Text style={styles.buttonText}>Other</Text>
      </TouchableOpacity>
    </View>
    </>
  );

  const inputElements = (
    <>
    {nameElement}
    {genderElement}
    {lookingForElement}
    </>
  );

  return (
    <ScrollView>
      <TouchableWithoutFeedback 
      onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.pageContainer}>
          <>
          <View style={styles.header} >
            <Text 
              style={styles.hyperlink} 
              onPress={onSignOut} 
            >Sign Out</Text>
          </View>
          <View style={styles.inputContainer}>
            {inputElements}
          </View>
          </>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ScrollView>
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