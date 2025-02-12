import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  Alert, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      verificaLogin();
      setLoading(false);
    }, 2000);
  };

  const verificaLogin = () => {
      if (!email.trim() || !senha.trim()) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      } else {
        navigation.navigate('main');
      }
    };

  return (
    <View style={styles.container}>
      <Image source={require("../../../../assets/Logo3.png")} style={{width: 200, height: 150, marginTop: 50}}/>
      <Text style={styles.title}>Bem vindo de volta!</Text>
      <Text style={styles.text}>Preencha o campo abaixo</Text>
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#666"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Carregando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={{marginTop: 20}} onPress={() => console.log("Esqueceu senha")}>
        <Text style={styles.text}>Esqueceu a senha?</Text>
      </TouchableOpacity>

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
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginHorizontal: 18,
    marginBottom: 10,
    color: corTexto,
    textAlign: 'center',
    marginTop: 50,
  },  
  text:{
    fontSize: 15,
    textAlign: 'center',
    color: corSubTexto,
    marginBottom: 10,
    marginHorizontal: 40,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#d4a413',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },  
  saveButton: {
    backgroundColor: corPrimaria, // Botão com a cor primária
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc', // Botão desativado com cinza
  },
  saveButtonText: {
    color: corTexto, // Texto branco
    fontWeight: 'bold',
  },
});