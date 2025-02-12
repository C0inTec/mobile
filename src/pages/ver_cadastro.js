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

export default function Cadastro() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirma, setSenhaConfirma] = useState('');
  const [cpf, setCpf] = useState('');
  const [contato, setContato] = useState('');
  const [dataAniversario, setData] = useState('');

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      VerificaCadastro();
      setLoading(false);
    }, 2000);
  };

  const VerificaCadastro = () => {
    if (!nome.trim() || !email.trim() || !senha.trim() || !senhaConfirma.trim() || !tipoInvestidor.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
      navigation.navigate('EntradaUser');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../../assets/Logo3.png")} style={{ width: 200, height: 150 }} />
      <Text style={styles.title}>É hora de iniciar sua jornada!</Text>
      <Text style={styles.text}>Crie sua conta e comece a transformar sua vida financeira!</Text>

      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={[styles.input, { width: "48%" }]}
          placeholder="Nome"
          placeholderTextColor="#666"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={[styles.input, { width: "48%", marginLeft: 15 }]}
          placeholder="Sobrenome"
          placeholderTextColor="#666"
          value={nome}
          onChangeText={setNome}
        />

      </View>


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
        placeholder="Confirme a senha"
        placeholderTextColor="#666"
        secureTextEntry
        value={senhaConfirma}
        onChangeText={setSenhaConfirma}
      />

      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#666"
        value={cpf}
        onChangeText={setCpf}
      />

      <TextInput
        style={styles.input}
        placeholder="Contato"
        placeholderTextColor="#666"
        value={contato}
        onChangeText={setContato}
      />

      <TextInput
        style={styles.input}
        placeholder="Data de Aniversário"
        placeholderTextColor="#666"
        value={dataAniversario}
        onChangeText={setData}
      />

      {/* Botão de Salvar */}
      <TouchableOpacity
        style={[styles.button, loading && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Carregando...' : 'Concluir'}
        </Text>
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
    justifyContent: 'center',
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
  },
  text: {
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
    backgroundColor: corPrimaria,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: corTexto,
    fontWeight: 'bold',
  },
});