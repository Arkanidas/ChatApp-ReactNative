import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from './Settings';
import Chat from "./components/Chat";
import App from '../App';

const Drawer = createDrawerNavigator();

export default function Drawer() {
  return (


    <Drawer.Navigator initialRouteName={Chat}>
       <Drawer.Screen name="You Chat" component={Chat} /> 
      <Drawer.Screen name="Settings" component={Settings} />
      
    </Drawer.Navigator>


  );
}