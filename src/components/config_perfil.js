import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, Image, TextInput, Vibration, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export default function ModalPerfil({ modalVisible, setModalVisible }) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [profileType] = useState('PF'); // PF = Pessoa Física, PJ = Pessoa Jurídica
  const [fieldOfWork, setFieldOfWork] = useState('');
  const [salary, setSalary] = useState('');
  const navigation = useNavigation();

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisible(false);
      console.log('Dados salvos:', {
        username,
        profileType,
        fieldOfWork,
        salary,
      });
    }, 2000);
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            // Redireciona para a tela "Início"
            navigation.navigate('Inicio');
          },
        },
      ],
      { cancelable: true }
    );
  };
  

  return (
    <Modal
      visible={modalVisible}
      animationType='slide'
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.chatHeader}>
          <Text style={styles.headerText}>Configurações de Perfil</Text>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Icon name='x' size={24} color='#000000' />
          </TouchableOpacity>
        </View>

        <View style={styles.scrollContent}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
            style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center' }}
          />
          <View style={{ position: 'relative', alignSelf: 'center' }}>
            <TouchableOpacity style={styles.iconEdit} onPress={() => Vibration.vibrate()}>
              <Icon name='edit' size={20} color='#FFFFFF' />
            </TouchableOpacity>
          </View>

          {/* Campos do Formulário */}
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite seu nome'
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Tipo de Perfil</Text>

          <TextInput
            style={styles.input}
            placeholder='Digite seu Tipo de Perfil (PF) ou (PJ)'
            value={fieldOfWork}
            onChangeText={setFieldOfWork}
          />


          <Text style={styles.label}>Área de Atuação</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite sua área de atuação'
            value={fieldOfWork}
            onChangeText={setFieldOfWork}
          />

          <Text style={styles.label}>Média Salarial</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite sua média salarial'
            keyboardType='numeric'
            value={salary}
            onChangeText={setSalary}
          />
          
         

          {/* Botão de Salvar */}
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Text>
          </TouchableOpacity>

           {/* Botão de Logout */}
           <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>
              Sair da Conta
            </Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </Modal>
  );
}

const corPrimaria = '#d4a413';
const corSecundaria = '#0a0a0a';
const corTexto = 'white';
const corBorda = '#c0c0c0';
const corPreta = 'black';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Mantido para o fundo transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white', // Cabeçalho com cor secundária
    padding: 12,
    width: '90%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Texto branco
  },
  closeButton: {
    padding: 8,
  },
  scrollContent: {
    backgroundColor: corTexto, // Fundo branco para o conteúdo do modal
    padding: 16,
    width: '90%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: corPreta, // Cor preta para os textos
  },
  input: {
    borderWidth: 1,
    borderColor: corBorda, // Borda cinza
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: corPreta, // Texto preto
    backgroundColor: '#f9f9f9', // Fundo cinza claro
  },
  errorText: {
    color: 'red', // Mensagem de erro em vermelho
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: corPrimaria, // Botão com a cor primária
    padding: 12,
    marginTop: 5,
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
  iconEdit: {
    position: 'absolute',
    bottom: 0, // Alinha ao fundo da imagem
    left: 15, // Alinha à esquerda da imagem
    backgroundColor: corPrimaria, // Opcional, adiciona contraste ao ícone
    borderRadius: 15, // Torna o fundo arredondado
    padding: 5, // Adiciona um pequeno espaçamento interno
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#c0c0c0', // Borda cinza
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f9f9f9', // Fundo cinza claro
  },
  picker: {
    height: 40,
    color: 'black', // Cor do texto
  },
  logoutButton: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#E74C3C',
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});