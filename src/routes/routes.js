import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

// Importando todas as rotas
import Main from '../pages/main/main';
import Welcome from '../pages/main/Welcome';
import Login from '../pages/main/Login/IndexLogin';
import Cadastro from '../pages/main/Cadastro/indexCadastro';
import Receita from '../pages/main/Receita/indexReceita';
import Despesa from '../pages/main/Despesa/despesa';


const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
        <Stack.Navigator  initialRouteName='Welcome' screenOptions={{ headerShown: false}}>
            <Stack.Screen name='Welcome' component={Welcome} screenOptions={{ headerShown: false}}/>
            <Stack.Screen name='Login' component={Login} screenOptions={{ headerShown: false}} />
            <Stack.Screen name='Cadastro' component={Cadastro} screenOptions={{ headerShown: false}} />
            <Stack.Screen name='main' component={Main} screenOptions={{ headerShown: false}} />
            <Stack.Screen name='Receita' component={Receita} screenOptions={{ headerShown: false}} />
            <Stack.Screen name='Despesa' component={Despesa} screenOptions={{ headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}