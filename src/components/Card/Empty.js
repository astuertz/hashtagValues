import { 
    View, 
    Text, 
    StyleSheet, 
    Button,
  } from 'react-native';
import React from 'react';

  
  const Empty = ({reset}) => {
  
    return (
      <View style={styles.pagecontainer}>
        <Text>Stack is Currently Empty!</Text>
        <Button title="Reset Stack" onPress={() => reset(0)} />
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
      },
  });
  
  export default Empty;