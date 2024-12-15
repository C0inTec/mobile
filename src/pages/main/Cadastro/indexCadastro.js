import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoInvestidor, setTipoInvestidor] = useState('');

  const VerificaCadastro = () => {
    if (!nome.trim() || !email.trim() || !senha.trim() || !tipoInvestidor.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
      navigation.navigate('EntradaUser');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoinTec$</Text>
      <Text style={styles.subtitle}>Preencha os campos abaixo :</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#666"
        value={nome}
        onChangeText={setNome}
      />
      
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
      
      <TextInput
        style={styles.input}
        placeholder="Tipo de Investidor"
        placeholderTextColor="#666"
        value={tipoInvestidor}
        onChangeText={setTipoInvestidor}
      />
      
      <TouchableOpacity 
        style={styles.button}
        onPress={VerificaCadastro}
      >
        <Text style={styles.buttonText}>Concluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#d4a413',
  },
  subtitle: {
    fontSize: 18,
    color: '#d4a413',
    marginVertical: 10,
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
});
