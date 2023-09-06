import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from './Settings';
import Chat from './Chat';


const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (

<>

    <Drawer.Navigator>
       <Drawer.Screen name="You Chat" component={Chat} /> 
       <Drawer.Screen name="Settings" component={Settings} /> 
       
    </Drawer.Navigator>
  
    </>

  );
}

