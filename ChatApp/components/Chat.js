import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Pressable} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



export default function Chat() {

 

  const [accesstoken, setAccesstoken] = useState(null);
  const [dataToken, setDataToken] = useState(null);
  const [UserId, setUserId] = useState(null);
  const [info, setinfo] = useState({data:[]});
  const [messageinfo, setmessageinfo] = useState('');
  const [meddelande, setmeddelande] = useState('');
  const [PostSucceeded, setPostSucceeded] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null); 
  const [boxvisible, setboxvisible] = useState(false); 

  
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
         
    },[UserId, meddelande, accesstoken,selectedMessageId]);
  

    const handleLongPress = (ItemId) => {
      setSelectedMessageId(ItemId);
      setboxvisible(true);
   
    };


    const removebox = () => {
      setboxvisible(false);
      setSelectedMessageId(null);
    };



const deletemessage = async (selectedMessageId) => {

try{

await fetch("https://chat-api-with-auth.up.railway.app/messages/" + selectedMessageId, {
method: 'DELETE',

headers:{
  'Content-Type':'application/json',
  'Authorization': `Bearer ${accesstoken}`,
},
});

setinfo((prevItems) => {
  return { data: prevItems.data.filter((item) => item._id !== selectedMessageId) };
})

setboxvisible(false);
}
catch(error){
  console.log("couldnt delete item")
}

}



  return (

   

    <SafeAreaView style={styles.container}>
 

  <FlatList
        data={info.data}
        keyExtractor={(item) => item._id} 
        renderItem={({ item }) => (
        
          <Pressable
          onLongPress={() => handleLongPress(item._id)} 
          delayLongPress={500}
        >
          <View style={item.user !== null && item.user._id === UserId ? styles.Yourmessages : styles.Message}>

          {item.user && item.user.username ? (
            <Text style={{ fontSize: 19 }}>{item.user.username}</Text>
          ) : null}
          
          <Text style={{ fontSize: 16 }}>{item.content}</Text>
          <Text> </Text>
          <Text style={{ color: "gray", fontSize: 10 }}>{item.date}</Text>
          
          
        </View>      
        
        </Pressable>    

            )}
            
            />
  
          
  {boxvisible && selectedMessageId ?(
  <View style={styles.overlay}>
    <Pressable onPress={() => removebox()}>
      <Entypo style={{ position:"relative", left:150, top:15}} name="cross" size={40} color="red" />
    </Pressable>

    <Pressable onPress={() => deletemessage(selectedMessageId)}>
    <AntDesign style={{ position:"relative", right:150, bottom:20 }} name="delete" size={28} color="white" />
    </Pressable>
  </View>
) : null}

       
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
    marginTop:30,
    borderRadius:10,
    marginLeft:200,
    backgroundColor:"lightgreen",
  },

  overlay: {
    position: 'absolute',
    zIndex:1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#343541",
    justifyContent: 'center',
    alignItems: 'center',
    height:67,
  },
  });