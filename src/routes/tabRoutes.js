import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


import Feed from '../pages/ver_feed';
import Relatorio from '../pages/ver_relatorio';

const Tab = createMaterialTopTabNavigator();

export default function TabRoutes({ eye }) {
  return (
    <Tab.Navigator screenOptions={({ route })=>({tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarIndicatorStyle: styles.indicador,
        tabBarIcon: () => {
            let iconName;
  
            if (route.name === 'Feed') {
              iconName = 'home';
            } else if (route.name === 'Profile') {
              iconName = 'dashboard';
            }
  
            return <MaterialIcons name={iconName} size={24} color='#000000' />;
          },
    })}>
      <Tab.Screen name="Feed">
        {() => <Feed eye={eye} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {() => <Relatorio/>}
      </Tab.Screen>
    </Tab.Navigator>
  );
} 

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#D4A413',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
      },
    indicador:{
        backgroundColor: '#000000',
        width: 130, 
        height: 4, 
        borderRadius: 2,
        marginLeft: 38,
    }
    });
