import 'react-native-gesture-handler';
import { Button, Pressable, SafeAreaView, StyleSheet, Text,} from 'react-native';
import * as React from 'react';
import 'react-native-gesture-handler';
import StackNavigator from './components/StackNav';
import DrawerNav from './components/DrawerNav'


export default function App() {
  return (
  <SafeAreaView style={styles.container}>
  <StackNavigator/>

  </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    resizeMode: 'cover',
    height:1100,
   
  
}
},)