import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

// Importando todas as rotas
import Main from '../pages/main/main';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
        <Stack.Navigator  initialRouteName='main' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='main' component={Main}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}