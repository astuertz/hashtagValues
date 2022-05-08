import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import logo from '../../graphics/Values_logo.png';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const LoadingScreen = () => {

  const initialize = async () => {
    let z = await DataStore.query(User);
    return z;
  }

  const dbUsers = initialize();

  return (
    <View style={styles.pageContainer}>
      <View style={styles.logo}>
        <Image 
          source={logo}  
          resizeMode='contain' 
        />
        <Text>Loading...</Text>
      </View>  
    </View>
  );
}

const styles = StyleSheet.create({
    root: {
      flex: 1
    },
    pageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      width: '100%'
    },
    logo: {
      flex: 1,
      width: WIDTH * .8,
      height: HEIGHT * .8,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

  export default LoadingScreen;