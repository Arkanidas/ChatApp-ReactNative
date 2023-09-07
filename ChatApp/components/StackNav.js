import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Login from './Login';
import Chat from './Chat';
import Register from './Register';
import DrawerNav from './DrawerNav';

const Stack = createNativeStackNavigator();


export default function StackNav() {
  return (
  <>
      
      <NavigationContainer>
      <Stack.Navigator>       
      <Stack.Screen name="Login Page" component={Login} options={{ headerShown: false}}/> 
      <Stack.Screen name="You Chat" component={DrawerNav} options={{title:"You Chat", headerShown: false}} />
      <Stack.Screen name="Register Page" component={Register} />      
      
      </Stack.Navigator>
      </NavigationContainer>

   




</>
   
  );
}

