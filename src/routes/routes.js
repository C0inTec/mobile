import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

// Importando todas as rotas
import Main from '../pages/main/main';
import Welcome from '../pages/main/Welcome';
import EntradaUser2 from '../pages/main/EntradaUser/IndexLogin';
import Cadastro from '../pages/main/Cadastro/indexCadastro';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
        <Stack.Navigator  initialRouteName='Welcome' screenOptions={{ headerShown: false}}>
            <Stack.Screen name='Welcome' component={Welcome} screenOptions={{ headerShown: false}}/>
            <Stack.Screen name='EntradaUser' component={EntradaUser2} screenOptions={{ headerShown: false}} />
            <Stack.Screen name='Cadastro' component={Cadastro} screenOptions={{ headerShown: false}} />
            <Stack.Screen name='main' component={Main} screenOptions={{ headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}