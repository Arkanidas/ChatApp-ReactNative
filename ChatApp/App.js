import { Button, Pressable, SafeAreaView, StyleSheet, Text, View,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Settings from "./components/Settings";
import Chat from "./components/Chat";
import Register from "./components/Register";
import Login from './components/Login';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <>
      <NavigationContainer>

      <Stack.Navigator>       
        <Stack.Screen name="Login Page" component={Login} /> 
        <Stack.Screen name="Register Page" component={Register} />      
      
      </Stack.Navigator>

    </NavigationContainer>




</>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

