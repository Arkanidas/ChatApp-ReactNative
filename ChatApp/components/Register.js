import React from 'react'
import { SafeAreaView, StyleSheet, Text, Button  } from 'react-native';

export default function Register({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
    <Text>Here we fucking go again register for fuck sake</Text>
    <Button title="go Back" onPress={()=> navigation.goBack()}> </Button>
 
  </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });