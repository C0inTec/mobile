import React, {useState} from 'react';
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
  const [animation, setAnimation] = useState("fadeInDown");

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation={animation}
        iterationCount={animation == "pulse" ? "infinite" : 1.0}
        duration={1500}
        delay={500}
        source={require('../../../../assets/Logo3.png')}
        style={{ marginTop: 100, width: "100%", height: 300 }}
        resizeMode="contain"
        onAnimationEnd={() => setAnimation("pulse")}
      />


      <Animatable.View animation="fadeInUp" duration={1500} delay={1000}>

        <View style={styles.containerModal}>

          <Text style={styles.title}>O jeito mais fácil de controlar suas finanças</Text>

          <Text style={styles.text}>Cadastre-se, crie planejamentos, controle, invista e muito mais!</Text>


          <TouchableOpacity style={[styles.button, { width: 280, padding: 15, justifyContent:'center', alignItems: 'center' }]}
                                    onPress={() => navigation.navigate('Cadastro')}>
            <Text style={{color: corTexto, fontWeight:"bold", fontSize: 15}}> Cadastre-se </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonVzd, { width: 280, padding: 15, justifyContent:'center', alignItems: 'center' }]}
                                    onPress={() => navigation.navigate('Login')}>
            <Text style={{color: corTexto, fontWeight:"bold", fontSize: 15}}> Já sou cadastrado </Text>
          </TouchableOpacity>

        </View>

      </Animatable.View>
    </View>
  );
}

const corPrimaria = '#d4a413';
const corSecundaria = '#0a0a0a';
const corIntermediaria = "#383838"
const corTexto = 'white';
const corSubTexto = "#d0d0d0"
const corBorda = '#c0c0c0';
const corPreta = 'black';

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginHorizontal: 18,
    marginBottom: 20,
    color: corTexto,
    textAlign: 'center',
  },
  text:{
    fontSize: 15,
    textAlign: 'center',
    color: corSubTexto,
    marginHorizontal: 40,
  },
  button: {
    backgroundColor: '#d4a413',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonVzd:{
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: corIntermediaria,
    borderColor: corPrimaria,
    borderWidth: 1,    
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerModal: {
    width: 370, 
    height: 275,
    marginTop: 20,
    borderRadius: 20,
    borderColor: corBorda,
    backgroundColor: corIntermediaria,
    shadowColor: corIntermediaria,
    shadowOffset: { width: 4, height: 8 }, // Direção da sombra
    shadowOpacity: 0.8, // Transparência da sombra
    shadowRadius: 15, // Suavização da sombra
    elevation: 10, // Necessário para Android
  }  
});
