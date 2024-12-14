import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import * as Animatable from 'react-native-animatable'
import{ useNavigation} from '@react-navigation/native'

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
       <Image
        source={require('../../../../assets/logo.png')}
        style={{ width: "100%", height: 300 }}
        resizeMode='contain'
        />
      <View>
      </View>
      <Text style={styles.title}>CoinTec$</Text>
      <Text style={styles.title}>Bem-vindo!</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={( )=>navigation.navigate('EntradaUser')}
        >
        <Text style={styles.buttonText}>Ir para Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8c8c8c',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#d4a413',
    padding: 10,
    borderRadius: 8,
    alignSelf:'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf:'center'
  },
});
