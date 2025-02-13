import React, {useState} from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {
  const navigation = useNavigation();
  const [animation, setAnimation] = useState("fadeInDown");

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation={animation}
        iterationCount={animation == "pulse" ? "infinite" : 1.0}
        duration={1500}
        delay={500}
        source={require('../../assets/Logo3.png')}
        style={{ marginTop: 300, width: "100%", height: 300 }}
        resizeMode="contain"
        onAnimationEnd={() => setAnimation("pulse")}
      />


      <Animatable.View animation="fadeInUp" duration={1500} delay={1000}>

        <View style={styles.containerModal}>

          <Text style={styles.title}>O jeito mais fácil de controlar suas finanças</Text>

          <Text style={styles.text}>Cadastre-se, crie planejamentos, controle, invista e muito mais!</Text>


          <TouchableOpacity style={[styles.button, { width: 280, padding: 15, justifyContent:'center', alignItems: 'center' }]}
                                    onPress={() => navigation.navigate('Cadastro')}>
            <Text style={{color: 'white', fontWeight:"bold", fontSize: 15}}> Cadastre-se </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonVzd, { width: 280, padding: 15, justifyContent:'center', alignItems: 'center' }]}
                                    onPress={() => navigation.navigate('Login')}>
            <Text style={{color: 'white', fontWeight:"bold", fontSize: 15}}> Já sou cadastrado </Text>
          </TouchableOpacity>

        </View>

      </Animatable.View>
    </View>
  );
}

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
    color: '#FFFFFF',
    textAlign: 'center',
  },
  text:{
    fontSize: 15,
    textAlign: 'center',
    color: '#D0D0D0',
    marginHorizontal: 40,
  },
  button: {
    backgroundColor: '#D4A413',
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
    backgroundColor: '#383838',
    borderColor: '#D4A413',
    borderWidth: 1,    
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerModal: {
    width: "96.5%", 
    height: "58%",
    marginTop: 20,
    borderRadius: 20,
    borderColor: '#C0C0C0',
    backgroundColor: '#383838',
    shadowColor: '#383838',
    shadowOffset: { width: 4, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  }  
});
