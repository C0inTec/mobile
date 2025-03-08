import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, Image, TextInput, Vibration, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './modalPerfilStyle';

export default function ModalPerfil({ modalVisible, setModalVisible }) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [profileType] = useState('PF'); // PF = Pessoa Física, PJ = Pessoa Jurídica
  const [fieldOfWork, setFieldOfWork] = useState('');
  const [salary, setSalary] = useState('');

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
              <Icon name='edit' size={20} color='#000000' />
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
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000080', // Mantido para o fundo transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0000000', // Cabeçalho com cor secundária
    padding: 16,
    width: '90%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto branco
  },
  closeButton: {
    padding: 8,
  },
  scrollContent: {
    backgroundColor: '#FFFFFF', // Fundo branco para o conteúdo do modal
    padding: 16,
    width: '90%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#000000', // Cor preta para os textos
  },
  input: {
    borderWidth: 1,
    borderColor: '#C0C0C0', // Borda cinza
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: '#000000', // Texto preto
    backgroundColor: '#F9F9F9', // Fundo cinza claro
  },
  errorText: {
    color: '#FF0000', // Mensagem de erro em vermelho
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#D4A413', // Botão com a cor primária
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC', // Botão desativado com cinza
  },
  saveButtonText: {
    color: '#FFFFFF', // Texto branco
    fontWeight: 'bold',
  },
  iconEdit: {
    position: 'absolute',
    bottom: 0, // Alinha ao fundo da imagem
    left: 15, // Alinha à esquerda da imagem
    backgroundColor: '#D4A413', // Opcional, adiciona contraste ao ícone
    borderRadius: 15, // Torna o fundo arredondado
    padding: 5, // Adiciona um pequeno espaçamento interno
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#C0C0C0', // Borda cinza
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#F9F9F9', // Fundo cinza claro
  },
  picker: {
    height: 40,
    color: '#000000', // Cor do texto
  },
});