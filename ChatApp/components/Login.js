 import React, { useCallback, useState, useEffect  } from 'react'
 import { SafeAreaView, StyleSheet, Text, View,  Button,ImageBackground, TouchableOpacity, TextInput,} from 'react-native';
 import { useFonts } from 'expo-font';
 import * as SplashScreen from 'expo-splash-screen';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import Chat from './Chat'


 SplashScreen.preventAutoHideAsync();

 export default function Login({navigation, route}) {

const [MessageVisible, setMessageVisible] = useState(true);
const [LoginResponseData, setLoginResponseData] = useState({});
const [username, setusername] = useState('');
const [password, setpassword] = useState('');
const [isloggedin, setisloggedin] = useState(null);
const [accesstoken,setaccesstoken] = useState(null);
const [userid, setuserid] = useState(null);

const LoginFetch =  "https://chat-api-with-auth.up.railway.app/auth/token";

useEffect(() => {
  fetchDataLogin();

  if (route.params?.message) {
    setMessageVisible(true);
    const timeout = setTimeout(() => {
      setMessageVisible(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }
}, [route.params?.message]);




const fetchDataLogin = async () => {

  try{
  
  const responseLogin = await fetch(LoginFetch, {
  method:'POST',
  
  headers:{
    'Content-Type':'application/json',
  },
  
  body: JSON.stringify({
  username: username,
  password: password,
  }),
  
  });
  
  const LoginData = await responseLogin.json();
  setLoginResponseData(LoginData);
  
  } catch(error){
    console.log("something went wrong, Please try again");
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

  
const handlelogin = async () =>{
  fetchDataLogin();

if(LoginResponseData.data && LoginResponseData.data.accessToken){
  setisloggedin(true);
  setaccesstoken(LoginResponseData.data.accessToken);
  setuserid(LoginResponseData.data._id)
  navigation.navigate('You Chat');


try {
  const userData = JSON.stringify({
    accessToken: LoginResponseData.data.accessToken,
    userId: LoginResponseData.data._id,
  });

  await AsyncStorage.setItem('userData', userData);}
   catch (error) {
    console.log("problem saving accesstoken, try again later");
  }



 

}

else{
  setisloggedin(false);
  setaccesstoken(null);
  
}

}


   return (
    
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground
      source={require('../assets/desert.jpg')}
      style={styles.container}
    >
 


    <View style={{position:"absolute", top:85}}><Text style={styles.HeaderText}>Login to YouChat!</Text></View>
   {MessageVisible && route.params?.message && (
          <Text style={{fontSize:16, color:"lime"}}>{route.params.message}</Text>
        )}
    <View style={styles.LoginContainer}>
   <TextInput style={styles.Textinput_username} onChangeText={(text) => setusername(text)}  placeholder='Username'></TextInput>
   <TextInput secureTextEntry={true} style={styles.Textinput_password} onChangeText={(pass) => setpassword(pass)} placeholder='Password'></TextInput>


{isloggedin ? <Text style={{fontSize:17, color:"lime"}}>{LoginResponseData.message}</Text>

            :<Text style={{fontSize:17, color:"darkred"}}>{LoginResponseData.message}</Text>

}


<TouchableOpacity style={styles.Button} onPress={()=> handlelogin()}>
  <Text style={{textAlign:"center", fontSize:22,}}>Log in</Text>
</TouchableOpacity>

   </View>

   <View style={{ flexDirection: "row", alignItems: "center", marginTop:"84%",}}>
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