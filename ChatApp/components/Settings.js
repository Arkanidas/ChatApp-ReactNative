import React from 'react'
import { StyleSheet, Text, View, Button, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Settings({navigation}) {



const handleLogOut = async () =>{

  try {

await AsyncStorage.removeItem("userData");
navigation.popToTop("Login Page");

return true;
}
catch(error) {
    return false;
}

}



  return (

    <View style={styles.container}>
      <Button onPress={()=> handleLogOut()} style={styles.logout}title="Log Out"></Button>

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
