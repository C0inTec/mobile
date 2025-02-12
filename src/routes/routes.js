import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

// Importando todas as rotas
import Home from '../pages/ver_home';
import Inicio from '../pages/ver_inicio';
import Login from '../pages/ver_login';
import Cadastro from '../pages/ver_cadastro';
import Receita from '../pages/ver_receita';
import Despesa from '../pages/ver_despesa';


const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
        <Stack.Navigator  initialRouteName='Inicio' screenOptions={{ headerShown: false}}>
            <Stack.Screen name='Inicio' component={Inicio} screenOptions={{ headerShown: false}}/>
            <Stack.Screen name='Login' component={Login} screenOptions={{ headerShown: false}} />
            <Stack.Screen name='Cadastro' component={Cadastro} screenOptions={{ headerShown: false}} />
            <Stack.Screen name='Home' component={Home} screenOptions={{ headerShown: false}} />
            <Stack.Screen name='Receita' component={Receita} screenOptions={{ headerShown: false}} />
            <Stack.Screen name='Despesa' component={Despesa} screenOptions={{ headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}