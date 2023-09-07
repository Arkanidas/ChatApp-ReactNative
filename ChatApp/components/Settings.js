import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Button title="Log Out"></Button>

    </View>
  )
}


const styles = StyleSheet.create({
    container: {  
      flex:1,
      backgroundColor: 'lightblue',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
