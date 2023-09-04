import React, {useCallback, useState,} from 'react'
import { SafeAreaView, StyleSheet, Text, View,ImageBackground, TouchableOpacity, TextInput, } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { AntDesign } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();
  

export default function Register({navigation}) {

const [username, setusername] = useState('');
const [password, setpassword] = useState('');
const [successMessage,setsuccessMessage] = useState(false);

  const [responseData, setResponseData] = useState({});

const RegisterFetch = "https://chat-api-with-auth.up.railway.app/auth/register";

const fetchData = async () => {

try{

const response = await fetch(RegisterFetch, {
method:'POST',

headers:{
  'Content-Type':'application/json',
},

body: JSON.stringify({
username: username,
password: password,
}),

});

const Data = await response.json();
setResponseData(Data);

} catch(error){
  console.log("something went wrong");
}}





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


const AccountCreated = () =>{

if (username.length > 0 && password.length > 0){

  if(username !== responseData.username){
  setpassword('');
  setusername('');
  fetchData();
  setsuccessMessage(false);
  navigation.navigate("Login Page", {message:"You have successfully registered! Please Login"});
}
}

else if(username.length <= 0 || password.length <= 0){
  setResponseData({});
  setsuccessMessage(true);

}

}

  return (

    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
    <ImageBackground
    source={require('../assets/blue.jpg')}
    style={styles.container}
  >
  {successMessage ? 
        <Text style={styles.SuccessfulMessage}>
         Please fill the blank spaces
        </Text>

        :<Text style={styles.ErrorMessage}>
          {responseData.message}</Text>
      }


  <View style={{position:"absolute", top:85}}><Text style={styles.HeaderText}>Register Account</Text></View>
 
  <View style={styles.LoginContainer}>
 <TextInput style={styles.Textinput_username} value={username} onChangeText={(text) => setusername(text)}  placeholder='Username'></TextInput>
 <TextInput secureTextEntry={true} style={styles.Textinput_password} value={password} onChangeText={(text) => setpassword(text)} placeholder='Password'></TextInput>

<TouchableOpacity style={styles.Button} onPress={()=> AccountCreated()}>

<Text style={{textAlign:"center", fontSize:22,}}>Create Account</Text>
</TouchableOpacity>

 </View>



 <TouchableOpacity onPress={()=>navigation.navigate("Login Page")}>
 <View style={{ flexDirection: "row", position:"absolute", top:170, right:0.1}}>
 <AntDesign name="arrowleft" size={30} color="gray" />
 <Text style={{fontSize:22, color:'gray'}}> Go back</Text>
 </View>
 </TouchableOpacity>


</ImageBackground>
</SafeAreaView>
 )
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    resizeMode: 'cover',
    width:"100%",
    height:900,
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
color:"black",
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

SuccessfulMessage:{

width:"70%",
position:"absolute",
top:190,
fontSize:20,
color:"red",
fontWeight:"bold",
},

ErrorMessage:{

  width:"80%",
  position:"absolute",
  top:190,
  textAlign:"center",
  fontSize:20,
  color:"purple",
  fontWeight:"bold",
}

});