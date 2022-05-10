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
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch, } from 'react-redux';
import { forceUpdate, signOutUser } from '../../features/counter/userAuthSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';
import queryProfileStack from '../AnimatedStack/updateStack';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ProfileSetup = ({ navigation }) => {

  const dispatch = useDispatch();
  

  const [name, setName] = useState('');
  const [gender, setGender] = useState('MALE');
  // lookingfor = [Male, Female, Trans Men, Trans Women, Other]
  const [lookingfor, setLookingFor] = useState([false, false, false, false, false]);
  const [height, setHeight] = useState('');
  const [age, setAge] = useState(null);
  const [location, setLocation] = useState(null);
  const [bodyType, setBodyType] = useState('NOCOMMENT');
  const [language, setLanguage] = useState('English');
  const [hasKids, setHasKids] = useState('NO');
  const [bio, setBio] = useState('');
  const [images, setImages] = useState(['','','','','','']);
  const [numOfImages, setNumOfImages] = useState(0);
  const [dbUser, setDBUser] = useState(null);
  const [id, setID] = useState(null);

  const profileSetupIsFocused = useIsFocused();
  const sub = useSelector((state) => state.user.sub);

  const findUser = async () => {
    let u = await DataStore.query(User, u => u.sub("eq", sub));
    if (!u[0]) return;
    setName(u[0].name);
    setGender(u[0].gender);
    let lf = u[0].lookingfor;
    let newLF = [false,false,false,false,false];
    if (lf.indexOf('MALE') != -1) newLF[0] = true;
    if (lf.indexOf('FEMALE') != -1) newLF[1] = true;
    if (lf.indexOf('TRANSMAN') != -1) newLF[2] = true;
    if (lf.indexOf('TRANSWOMAN') != -1) newLF[3] = true;
    if (lf.indexOf('OTHER') != -1) newLF[4] = true;
    setLookingFor(newLF);
    setHeight(u[0].height);
    setBodyType(u[0].bodytype);
    setHasKids(u[0].kids);
    setLanguage(u[0].language);
    setBio(u[0].bio);
    setDBUser(true);
    setImages(u[0].image);
    setNumOfImages(u[0].image.length);
    setAge(u[0].age);
    setLocation(u[0].location);
    setID(u[0].id);
  }
  
  useEffect(() => {
    if (!profileSetupIsFocused) return;
    findUser();
  },[profileSetupIsFocused]);

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

  const locationElement = (
    <>
    <Text style={styles.plainText} >Where do you live?</Text>
    <TextInput 
      placeholder='location'
      value={location}
      onChangeText={setLocation}
      style={styles.textInput} 
    />
    </>
  );

  const heightElement = (
    <>
    <Text style={styles.plainText} >What is your height?</Text>
    <TextInput 
      placeholder='height'
      value={height}
      onChangeText={setHeight}
      style={styles.textInput} 
    />
    </>
  );

  const ageElement = (
    <>
    <Text style={styles.plainText} >How old are you?</Text>
    <TextInput 
      placeholder='age'
      value={age}
      onChangeText={setAge}
      style={styles.textInput} 
      keyboardType='numeric'
    />
    </>
  );

  const languageElement = (
    <>
    <Text style={styles.plainText} >What is your native language?</Text>
    <TextInput 
      placeholder='language'
      value={language}
      onChangeText={setLanguage}
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

  const bodyTypeElement = (
    <>
    <Text style={styles.plainText} >What is your body type?</Text>
    <View style={styles.buttonRow} >
      <TouchableOpacity 
        style={bodyType == 'SLIM' ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setBodyType('SLIM')}
      >
        <Text style={styles.buttonText}>Slim</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={bodyType == 'ATHLETIC' ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setBodyType('ATHLETIC')}
      >
        <Text style={styles.buttonText}>Athletic</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={bodyType == 'AVERAGE' ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setBodyType('AVERAGE')}
      >
        <Text style={styles.buttonText}>Average</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={bodyType == 'OVERWEIGHT' ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setBodyType('OVERWEIGHT')}
      >
        <Text style={styles.buttonText}>Overweight</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={bodyType == 'NOCOMMENT' ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setBodyType('NOCOMMENT')}
      >
        <Text style={[styles.buttonText, {fontSize: 16,}]}>Prefer Not To Say</Text>
      </TouchableOpacity>      
    </View>
    </>
  );

  const hasKidsElement = (
    <>
    <Text style={styles.plainText} >Do you have kids?</Text>
    <View style={styles.buttonRow} >
      <TouchableOpacity 
        style={hasKids == 'YES' ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setHasKids('YES')}
      >
        <Text style={styles.buttonText}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={hasKids == 'NO' ? styles.buttonActive : styles.buttonInActive} 
        onPress={() => setHasKids('NO')}
      >
        <Text style={styles.buttonText}>No</Text>
      </TouchableOpacity>           
    </View>
    </>
  );

  const bioElement = (
    <>
    <Text style={styles.plainText} >Tell us about yourself...</Text>
    <TextInput 
      placeholder='bio'
      value={bio}
      onChangeText={setBio}
      style={styles.textInput}
      multiline={true} 
    />
    </>
  );

  const MINUS_COLOR = 'red';

  const imageElement = (
    <>
    {numOfImages > 0 ? (
      <View style={styles.imageInputRow} >
        <TextInput 
          placeholder='image url'
          value={images[0]}
          onChangeText={text => setImages([text,images[1],images[2],images[3],images[4],images[5]])}
          style={[styles.textInput, {width: WIDTH * .7, marginRight: 10,}]} 
        />
        <TouchableOpacity 
          onPress={() => {
            let si = images;
            si[0] = '';
            if (numOfImages > 1) {
              for (i=0; i < numOfImages; i++) {
                si[i] = si[i+1];
              }
              si[numOfImages-1] = '';
            }
            setImages(si);
            setNumOfImages(numOfImages - 1);
          }}
        >
          <AntDesign 
            name="minuscircleo"
            size={30}
            color={MINUS_COLOR}
            style={styles.minusIcon}
          />
        </TouchableOpacity>
      </View>
    ) : null}
    {numOfImages > 1 ? (
      <View style={styles.imageInputRow} >
        <TextInput 
          placeholder='image url'
          value={images[1]}
          onChangeText={text => setImages([images[0],text,images[2],images[3],images[4],images[5]])}
          style={[styles.textInput, {width: WIDTH * .7, marginRight: 10,}]} 
        />
        <TouchableOpacity 
          onPress={() => {
            let si = images;
            si[1] = '';
            if (numOfImages > 2) {
              for (i=1; i < numOfImages; i++) {
                si[i] = si[i+1];
              }
              si[numOfImages-1] = '';
            }
            setImages(si);
            setNumOfImages(numOfImages - 1);
          }}
        >
          <AntDesign 
            name="minuscircleo"
            size={30}
            color={MINUS_COLOR}
            style={styles.minusIcon}
          />
        </TouchableOpacity>
      </View>
    ) : null}
    {numOfImages > 2 ? (
      <View style={styles.imageInputRow} >
        <TextInput 
          placeholder='image url'
          value={images[2]}
          onChangeText={text => setImages([images[0],images[1],text,images[3],images[4],images[5]])}
          style={[styles.textInput, {width: WIDTH * .7, marginRight: 10,}]} 
        />
        <TouchableOpacity 
          onPress={() => {
            let si = images;
            si[2] = '';
            if (numOfImages > 3) {
              for (i=2; i < numOfImages; i++) {
                si[i] = si[i+1];
              }
              si[numOfImages-1] = '';
            }
            setImages(si);
            setNumOfImages(numOfImages - 1);
          }}
        >
          <AntDesign 
            name="minuscircleo"
            size={30}
            color={MINUS_COLOR}
            style={styles.minusIcon}
          />
        </TouchableOpacity>
      </View>
    ) : null}
    {numOfImages > 3 ? (
      <View style={styles.imageInputRow} >
        <TextInput 
          placeholder='image url'
          value={images[3]}
          onChangeText={text => setImages([images[0],images[1],images[2],text,images[4],images[5]])}
          style={[styles.textInput, {width: WIDTH * .7, marginRight: 10,}]} 
        />
        <TouchableOpacity 
          onPress={() => {
            let si = images;
            si[3] = '';
            if (numOfImages > 4) {
              for (i=3; i < numOfImages; i++) {
                si[i] = si[i+1];
              }
              si[numOfImages-1] = '';
            }
            setImages(si);
            setNumOfImages(numOfImages - 1);
          }}
        >
          <AntDesign 
            name="minuscircleo"
            size={30}
            color={MINUS_COLOR}
            style={styles.minusIcon}
          />
        </TouchableOpacity>
      </View>
    ) : null}
    {numOfImages > 4 ? (
      <View style={styles.imageInputRow} >
        <TextInput 
          placeholder='image url'
          value={images[4]}
          onChangeText={text => setImages([images[0],images[1],images[2],images[3],text,images[5]])}
          style={[styles.textInput, {width: WIDTH * .7, marginRight: 10,}]} 
        />
        <TouchableOpacity 
          onPress={() => {
            let si = images;
            si[4] = '';
            if (numOfImages > 5) {
              si[4] = si[5];
              si[5] = '';
            }
            setImages(si);
            setNumOfImages(numOfImages - 1);
          }}
        >
          <AntDesign 
            name="minuscircleo"
            size={30}
            color={MINUS_COLOR}
            style={styles.minusIcon}
          />
        </TouchableOpacity>
      </View>
    ) : null}
    {numOfImages > 5 ? (
      <View style={styles.imageInputRow} >
        <TextInput 
          placeholder='image url'
          value={images[5]}
          onChangeText={text => setImages([images[0],images[1],images[2],images[3],images[4],text])}
          style={[styles.textInput, {width: WIDTH * .7, marginRight: 10,}]} 
        />
        <TouchableOpacity 
          onPress={() => {
            let si = images;
            si[5] = '';
            setImages(si);
            setNumOfImages(numOfImages - 1);
          }}
        >
          <AntDesign 
            name="minuscircleo"
            size={30}
            color={MINUS_COLOR}
            style={styles.minusIcon}
          />
        </TouchableOpacity>
      </View>
    ) : null}
    </>
  );

  const imageContainer = (
    <>
    <Text style={styles.plainText} >Add Images</Text>
    <View style={[styles.imageBackground, {padding: numOfImages > 0 ? 10 : 0,}]} >
      {imageElement}
    </View>
    <TouchableOpacity 
      onPress={() => {
        if (numOfImages == 6) return;
        setNumOfImages(numOfImages + 1)
      }}
    >
      <Ionicons 
        name="add-circle-outline"
        size={40}
        color={'black'}
      />
    </TouchableOpacity>
    </>
  );
  
  const isValid = () => {
    return name && gender && lookingfor && height && bodyType && language && hasKids && bio;
  }

  const onPressSave = async () => {
    if (!isValid()) return Alert.alert('Please fill in all fields!');

    let newImages = [''];

    if (images[0] == '') {
      newImages = ['https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg'];
    } else {
      for (i=0; i < numOfImages; i++) {
        newImages[i] = images[i];
      }
    }

    let lf = [''];
    if (lookingfor[0]) {
      lf.push('MALE');
    }
    if (lookingfor[1]) {
      lf.push('FEMALE');
    }
    if (lookingfor[2]) {
      lf.push('TRANSMAN');
    }
    if (lookingfor[3]) {
      lf.push('TRANSWOMAN');
    }
    if (lookingfor[4]) {
      lf.push('OTHER');
    }
    for (i=0; i < lf.length; i++) {
      lf[i] = lf[i+1];
    }
    lf.pop();


    if (!dbUser) {

      let stack = queryProfileStack(sub, gender, lf, null);

      await DataStore.save(
        new User({
        "name": name,
        "image": newImages,
        "bio": bio,
        "gender": gender,
        "lookingfor": lf,
        "sub": sub,
        "height": height,
        "bodytype": bodyType,
        "language": language,
        "kids": hasKids,
        "age": age,
        "location": location,
        "stack": stack,
      })
    );
  } else {
    let dbUsers = await DataStore.query(User, u => u.sub("eq", sub));
    let u = dbUsers[0];
    let newStack = await queryProfileStack(sub, gender, lf, id);
    await DataStore.save(User.copyOf(u, updated => {
      updated.name = name;
      updated.image = newImages;
      updated.bio = bio;
      updated.gender = gender;
      updated.lookingfor = lf;
      updated.height = height;
      updated.bodytype = bodyType;
      updated.language = language;
      updated.kids = hasKids;
      updated.age = age;
      updated.location = location;
      updated.stack = newStack;
  }));

  }
  Alert.alert('Profile Saved!');
  dispatch(forceUpdate(true));
  navigation.pop();
  }

  const saveButton = (
    <TouchableOpacity 
    onPress={onPressSave} 
    style={styles.saveButton} 
  >
    <Text style={styles.buttonText}>Save</Text>
  </TouchableOpacity>
  );

  const inputElements = (
    <>
    {nameElement}
    {locationElement}
    {genderElement}
    {lookingForElement}
    {heightElement}
    {ageElement}
    {bodyTypeElement}
    {hasKidsElement}
    {languageElement}
    {bioElement}
    {imageContainer}
    {saveButton}
    </>
  );

  return (
    <SafeAreaView style={styles.pageContainer}>
        <ScrollView>
            <View style={styles.inputContainer}>
                <TouchableWithoutFeedback 
                    onPress={() => Keyboard.dismiss()}>
                    <>
                    {inputElements}
                    </>
                </TouchableWithoutFeedback>
                
            </View>
        </ScrollView>
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
    height: HEIGHT,
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
    height: 40,
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
    height: 40,
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
    textAlign: 'center',
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
  saveButton: {
    width: '95%',
    height: HEIGHT * .06,
    marginVertical: 15,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#75326b',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    
    elevation: 24,
    borderBottomColor: 'black',
    borderWidth: 3,

  },
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#575b61',
    borderRadius: 25,
    width: '100%',
    minHeight: 0,
  },
  imageInputRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  minusIcon: {
    bottom: 5,
    backgroundColor: 'white',
    borderRadius: 15,
  },
});


export default ProfileSetup;