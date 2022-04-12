import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SignUp = () => {

    return (
        <View style={styles.pageContainer}>
            <Text>SingUp Screen</Text>
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

  export default SignUp;