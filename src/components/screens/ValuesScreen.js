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

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ValuesScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  
  const [dbUser, setDBUser] = useState(null);
  const [dbUsers, setDBUsers] = useState(null);
  const [search, setSearch] = useState('');
  const [foundValues, setFoundValues] = useState([]);

  const valuesScreenIsFocused = useIsFocused();
  const sub = useSelector((state) => state.user.sub);

  const findUser = async () => {
    let u = await DataStore.query(User, u => u.sub("eq", sub));
    if (!u[0]) return;
  }

  const fetchdbUsers = async () => {
    let dbU = await DataStore.query(User);
    setDBUsers(dbU);
  }
  
  useEffect(() => {
    if (!valuesScreenIsFocused) return;
    fetchdbUsers();
  },[valuesScreenIsFocused]);

  const getValueCount = (string) => {
    let c = 0;
    dbUsers.forEach(e => {
    c += e.hashtags.filter(obj => {
        if (obj.name == string) {
        return true;
        }

        return false;
    }).length;
    });
    return c;
  }

  const searchForValues = () => {
    let results = [];
    dbUsers.forEach(e => {
        e.hashtags.filter(obj => {
            if (obj.name.toLowerCase().includes(search.toLowerCase())) {
                let count = getValueCount(obj.name);
                results.push({
                    name: obj.name,
                    count: count,
                })
            }
        });
    });
    setFoundValues(results);
  }

  const searchElement = (
    <>
    <Text style={styles.plainText} >Enter a value to search for:</Text>
    <TextInput 
      placeholder='search'
      value={search}
      onChangeText={setSearch}
      style={styles.textInput} 
    />
    </>
  );

  const displaySearchResults = (
    <View style={styles.foundValuesContainer} >
        {foundValues.map((e, index) =>
            <>
            <Text 
            key={e.name + e.count} 
            style={{color: "#782f2f", fontSize: 14, fontWeight: 'bold',}}
            >{e.name} ({e.count})</Text>
            </>
        )}
    </View>
  );

  const HASHTAGS = {
    "name": "libertarian",
    "weight": 3,
  };

  const onPressSave = async () => {
    if (!dbUser) return Alert.alert('Profile Not Set Up!','Go to Set Up Profile');
    let dbUsers = await DataStore.query(User, u => u.sub("eq", sub));
    let u = dbUsers[0];
    /*
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
    }));
    */
    Alert.alert('Profile Saved!');
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

  const searchButton = (
    <TouchableOpacity 
    onPress={searchForValues} 
    style={styles.saveButton} 
  >
    <Text style={styles.buttonText}>Search</Text>
  </TouchableOpacity>
  );

  const inputElements = (
    <>
    {searchElement}
    {displaySearchResults}
    {searchButton}
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
    paddingTop: 10,
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
  foundValuesContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
    minHeight: HEIGHT * .1,
    padding: 10,
  },
});


export default ValuesScreen;