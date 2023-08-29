 import React, { Component, useCallback, useState,  } from 'react'
 import { SafeAreaView, StyleSheet, Text, View,  Button, Alert,ImageBackground, TouchableOpacity, TextInput,} from 'react-native';
 import { useFonts } from 'expo-font';
 import * as SplashScreen from 'expo-splash-screen';


 SplashScreen.preventAutoHideAsync();

 export default function Login({navigation}) {

const [username, setusername] = useState('');
const [password, setpassword] = useState('');


  const [fontsLoaded] = useFonts({
    'Lobster': require('../assets/fonts/Lobster-Regular.ttf'),
    'Akaya': require('../assets/fonts/AkayaKanadaka-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }



   return (
    
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground
      source={require('../assets/desert.jpg')}
      style={styles.container}
    >
 
    <View style={{position:"absolute", top:85}}><Text style={styles.HeaderText}>Login to YouChat!</Text></View>
   
    <View style={styles.LoginContainer}>
   <TextInput style={styles.Textinput_username} onChangeText={(text) => setusername(text)}  placeholder='Username'></TextInput>
   <TextInput secureTextEntry={true} style={styles.Textinput_password} onChangeText={(pass) => setpassword(pass)} placeholder='Password'></TextInput>

<TouchableOpacity style={styles.Button} onPress={()=> Alert.alert("hello there " + password)}>
  <Text style={{textAlign:"center", fontSize:22,}}>Log in</Text>
</TouchableOpacity>

   </View>

   <View style={{ flexDirection: "row", alignItems: "center", marginTop:"75%",}}>
<Text style={{fontSize:14}}>Don't have an account?</Text>
<Button title="Register" onPress={() => navigation.navigate("Register Page")}></Button>
</View>
</ImageBackground>
  </SafeAreaView>
   )
 }
 
 
const styles = StyleSheet.create({
    container: {
      flex:1,
      resizeMode: 'cover',
      width:"100%",
      height:800,
      alignItems: 'center',
      justifyContent: 'center',
    },

  Textinput_username:{
   borderBottomWidth:1,
   borderColor:"black",
   width:"100%",
   margin:5,
   padding:15,
   fontFamily:"Akaya",
   fontSize:24,
   marginBottom:50,
  
  },

  Textinput_password:{
    borderBottomWidth:1,
    borderColor:"black",
    width:"100%",
    margin:5,
    padding:10,
    fontFamily:"Akaya",
    fontSize:24,
    marginTop:-10,
    
   },

HeaderText:{

  fontSize:45,
  fontFamily:"Lobster",
  color:"#5b0e2d",
},

LoginContainer:{
width:"100%",
position:"absolute",
marginLeft:"50%",
bottom:"30%",
height:290,
margin:10,
padding:30,
borderRadius:30,


},

Button:{
padding:10,
marginTop:35,
borderWidth:1,
borderRadius:10,
width:"100%",
margin:5,
backgroundColor:"beige",
},

  });