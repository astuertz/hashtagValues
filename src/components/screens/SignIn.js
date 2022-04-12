import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SignIn = ({ navigation }) => {

    return (
        <View style={styles.pageContainer}>
            <Text>SingIn Screen</Text>
            <Button title="Sign Up" onPress={() => navigation.push("SignUp")} />
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
    topNavigation: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      height: '15%',
      padding: 10
    }
  });

  export default SignIn;