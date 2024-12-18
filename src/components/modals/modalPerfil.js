import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, Image, TextInput, ScrollView, Vibration } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Novo Picker
import Icon from 'react-native-vector-icons/Feather';
import styles from './modalPerfilStyle';

export default function ModalPerfil({ modalVisible, setModalVisible }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [profileType, setProfileType] = useState('PF'); // PF = Pessoa Física, PJ = Pessoa Jurídica
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
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.chatHeader}>
          <Text style={styles.headerText}>Configurações de Perfil</Text>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Icon name="x" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.scrollContent}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
            style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center' }}
          />
          <View style={{ position: 'relative', alignSelf: 'center' }}>
            <TouchableOpacity style={styles.iconEdit} onPress={() => Vibration.vibrate()}>
              <Icon name="edit" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Campos do Formulário */}
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Tipo de Perfil</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu Tipo de Perfil (PF) ou (PJ)"
            value={fieldOfWork}
            onChangeText={setFieldOfWork}
          />


          <Text style={styles.label}>Área de Atuação</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua área de atuação"
            value={fieldOfWork}
            onChangeText={setFieldOfWork}
          />

          <Text style={styles.label}>Média Salarial</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua média salarial"
            keyboardType="numeric"
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
