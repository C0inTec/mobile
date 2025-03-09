import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  Alert, 
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    const url = 'https://b109-2804-954-ffcf-9a00-5d79-e4e8-a91c-6357.ngrok-free.app/auth/login'; // Endpoint da API de login
    const data = {
      email: email,
      password: senha,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseText = await response.text(); // Obtém o texto completo da resposta
      console.log('Resposta completa:', responseText);

      if (response.ok) {
        const result = JSON.parse(responseText); // Faz o parsing manual da resposta
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('Home'); // Navega para a tela principal
      } else {
        console.error('Erro na API:', responseText);
        Alert.alert('Erro', responseText || 'Ocorreu um erro ao realizar o login.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível realizar o login. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Logo3.png')} style={{width: 200, height: 150, marginTop: 50}}/>
      <Text style={styles.title}>Bem vindo de volta!</Text>
      <Text style={styles.text}>Preencha os campos abaixo</Text>
      
      <TextInput
        style={styles.input}
        placeholder='E-mail'
        placeholderTextColor='#666666'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />

      <TextInput
        style={styles.input}
        placeholder='Senha'
        placeholderTextColor='#666666'
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.saveButtonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Carregando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={{marginTop: 20}} onPress={() => console.log('Esqueceu senha')}>
        <Text style={styles.text}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginHorizontal: 18,
    marginBottom: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },  
  text:{
    fontSize: 15,
    textAlign: 'center',
    color: '#D0D0D0',
    marginBottom: 10,
    marginHorizontal: 40,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#D4A413',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },  
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
});