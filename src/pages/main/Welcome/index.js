import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Button
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="fadeInDown"
        duration={1500}
        delay={500}
        source={require('../../../../assets/logo.png')}
        style={{ width: "100%", height: 300 }}
        resizeMode="contain"
      />

      <Animatable.View animation="fadeInUp" duration={1500} delay={1500}>
        <Text style={styles.title}>CoinTec$</Text>
        <Text style={styles.title}>Bem-vindo!</Text>
      </Animatable.View>


      <Animatable.View 
        animation="fadeInUp" 
        duration={1500} 
        delay={4000} 
      >
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('EntradaUser')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro')}

        >
        <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#d4a413',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#d4a413',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Button
});
