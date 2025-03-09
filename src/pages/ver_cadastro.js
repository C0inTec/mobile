import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  const [dataNascimento, setDataNascimento] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // Função para enviar os dados para a API
  const sendDataToAPI = async () => {
    const url = 'https://ab8f-2804-954-3c0-aa00-2cd2-b927-e182-6a51.ngrok-free.app/auth/register'; // Endpoint da API

    const data = {
      nome,
      sobrenome,
      email,
      senha,
      cpf,
      contato,
      dataNascimento,
      role: 'user',
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
        const result = JSON.parse(responseText); // Faz o parsing manualmente
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('EntradaUser');
      } else {
        console.error('Erro na API:', responseText);
        Alert.alert('Erro', responseText || 'Ocorreu um erro ao realizar o cadastro.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível realizar o cadastro. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!nome.trim() || !email.trim() || !senha.trim() || !senhaConfirma.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== senhaConfirma) {
      Alert.alert('Erro', 'As senhas não coincidem. Verifique e tente novamente.');
      return;
    }

    setLoading(true);
    sendDataToAPI();
  };

  const handleDateChange = (event, selectedDate) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Formata para 'YYYY-MM-DD'
      setDataNascimento(formattedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={require('../../assets/Logo3.png')} style={{ width: 200, height: 150 }} />
        <Text style={styles.title}>É hora de iniciar sua jornada!</Text>
        <Text style={styles.text}>Crie sua conta e comece a transformar sua vida financeira!</Text>

        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[styles.input, { width: '48%' }]}
            placeholder="Nome"
            placeholderTextColor="#666666"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={[styles.input, { width: '48%', marginLeft: 15 }]}
            placeholder="Sobrenome"
            placeholderTextColor="#666666"
            value={sobrenome}
            onChangeText={setSobrenome}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#666666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#666666"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirme a senha"
          placeholderTextColor="#666666"
          secureTextEntry
          value={senhaConfirma}
          onChangeText={setSenhaConfirma}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          placeholderTextColor="#666666"
          value={cpf}
          onChangeText={setCpf}
        />

        <TextInput
          style={styles.input}
          placeholder="Contato"
          placeholderTextColor="#666666"
          value={contato}
          onChangeText={setContato}
        />

        <TouchableOpacity
          style={styles.input}
          onPress={() => setDatePickerVisible(true)}
        >
          <Text style={{ color: dataNascimento ? '#000' : '#666666' }}>
            {dataNascimento || 'Data de Nascimento'}
          </Text>
        </TouchableOpacity>
        {datePickerVisible && (
          <DateTimePicker
            value={dataNascimento ? new Date(dataNascimento) : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
    color: '#FFFFFF',
    textAlign: 'center',
  },
  text: {
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
    justifyContent: 'center',
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