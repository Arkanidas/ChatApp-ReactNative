import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity,Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';





export default function Chat({navigation}) {

 

  const [accesstoken, setAccesstoken] = useState(null);
  const [dataToken, setDataToken] = useState(null);
  const [UserId, setUserId] = useState(null);
  const [info, setinfo] = useState({data:[]});
  const [messageinfo, setmessageinfo] = useState('');
  const [meddelande, setmeddelande] = useState('');
  const [PostSucceeded, setPostSucceeded] = useState(null);
  const [sentMessages, setSentMessages] = useState([]);

  
const MessageFetch = "https://chat-api-with-auth.up.railway.app/messages";



const PostMessage = async () =>{
  

try{
  const postmessage = await fetch(MessageFetch, {
    method:'POST',

    headers:{
      'Content-Type':'application/json',
      'Authorization': `Bearer ${accesstoken}`,
    },

    body: JSON.stringify({
      content: meddelande,
      user: UserId,
      }),

    });
  
    const PostData = await postmessage.json();
    setmessageinfo(PostData);
    
    if (PostData.status === 201) {
      setPostSucceeded(true);
       
    }
   else{
    setPostSucceeded(false);
   }
}

catch(error){
  console.log("couldnt post message " + error)
}
}



  const Fetchmessages = async () => {

    try{
    
      const dataToken = await AsyncStorage.getItem("userData");

      if (dataToken) {
        const parsedData = JSON.parse(dataToken);
        const accessToken = parsedData.accessToken;
        setAccesstoken(accessToken);
  
        const userid = parsedData.userId;
        setUserId(userid);
        
      }

    const responseMessage = await fetch(MessageFetch, {
    method:'GET',
    
    headers:{
      'Authorization': `Bearer ${accesstoken}`,
    },
    });
    
    const MessageData = await responseMessage.json();
    setinfo(MessageData);
    
    } catch(error){
      console.log("something went wrong, Please try again");
    }}
    


     useEffect(() => {

     Fetchmessages();
      console.log("fetch running")
  
      
    },[UserId, meddelande]);
  


  return (

  
    <SafeAreaView style={styles.container}>
 

<FlatList
        data={info.data}
        keyExtractor={(item) => item._id} 
        renderItem={({ item }) => (

          <View style={styles.container}>

          <Text {...item.data === UserId ? styles.Yourmessages : styles.Message}>
            
          {item.user && item.user.username ? (
            <Text style={{ fontSize: 19 }}>{item.user.username}</Text>
          ) : null}
          
          <Text style={{ fontSize: 16 }}>{item.content}</Text>
          <Text> </Text>
          <Text style={{ color: "gray", fontSize: 10 }}>{item.date}</Text>
          
          </Text>
        </View>                                
  

        )}/>


       
      <TextInput style={styles.textinput} onChangeText={(med) => setmeddelande(med)} placeholder='Enter your message...'></TextInput>
      <TouchableOpacity onPress={() => PostMessage() }>

      <MaterialCommunityIcons style={styles.icon} name="send" size={43} color="blue" />
      </TouchableOpacity>
   

    </SafeAreaView>
  )
  }
  


  
const styles = StyleSheet.create({
    container: {
        flex:1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
     
     
    },
  textinput:{

position:"absolute",
bottom:15,
left:30,
borderWidth:2,
padding:15,
borderRadius:25,
width:"70%",
backgroundColor:"white",
  },

icon:{
position:"absolute",
bottom:20,
left:130,

  },

  Message:{
    flex:1,
    borderColor:"gray",
    borderWidth:1,
    justifyContent:"flex-start",
    padding:10,
    marginRight:200,
    borderRadius:10,
    marginTop:30,
    backgroundColor:"lightblue",
  },

  Yourmessages:{
    borderColor:"gray",
    flex:1,
    justifyContent:"flex-end",
    borderWidth:1,
    padding:10,
    borderRadius:10,
    marginLeft:200,
    backgroundColor:"lightgreen",
  }
  });