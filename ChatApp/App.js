import { Button, Pressable, SafeAreaView, StyleSheet, Text, View,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Register from "./components/Register";
import Login from './components/Login';
import 'react-native-gesture-handler';
import Chat from './components/Chat';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
  <>
      <NavigationContainer>

      <Stack.Navigator>       
      <Stack.Screen name="Login Page" component={Login} /> 
      <Stack.Screen  name="You Chat" component={Chat} options={{title:"You Chat", headerBackVisible: false}} />
      <Stack.Screen  name="Register Page" component={Register} />      
       
      </Stack.Navigator>


    </NavigationContainer>




</>
   
  );
}

