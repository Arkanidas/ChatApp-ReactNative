import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Chat() {

  const [accesstoken, setAccesstoken] = useState(null);
  const [dataToken, setDataToken] = useState(null);
  const [userid, setuserid] = useState(null);
  const [info, setinfo] = useState({data:[]});


const MessageFetch =  "https://chat-api-with-auth.up.railway.app/messages";


  const Fetchmessages = async () => {

    try{
    
      const dataToken = await AsyncStorage.getItem("userData");

      if (dataToken) {
        const parsedData = JSON.parse(dataToken);
        const accessToken = parsedData.accessToken;
        setAccesstoken(accessToken);
  
        const userid = parsedData.userId;
        setuserid(userid);
        
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
      
    }, []);
  


  return (

  
    <SafeAreaView style={styles.container}>

<FlatList
        data={info.data}
        keyExtractor={(item) => item._id} 
        renderItem={({ item }) => (
          <View style={styles.Message}>
            <Text>{item.content}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
      />


      <TextInput style={styles.textinput}placeholder='Enter your message...'></TextInput>
      <TouchableOpacity onPress={() =>Alert.alert("hello")}>
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
bottom:50,
left:30,
borderWidth:2,
padding:15,
borderRadius:25,
width:"70%",
backgroundColor:"white",
  },

  icon:{
position:"relative",
bottom:20,
left:145,

  },

  Message:{
    borderWidth:2,
    padding:10,
    width:170,
    columnGap:10,
    marginRight:200,
    borderRadius:10,
    marginTop:20,
  }

  });