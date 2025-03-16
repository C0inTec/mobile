import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import ModalChat from '../components/chat_bot';
import ModalPerfil from '../components/config_perfil';
import Header from '../components/header';
import TabRoutes from '../routes/tabRoutes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const navigation = useNavigation();
  const [eye, setEye] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [ModalPerfilVisible, setModalPerfilVisible] = useState(false);
  const [apiResponseUser, setApiResponseUser] = useState('');

  const fetchUserById = async (userId) => {
    try {
      // Recupera o token do AsyncStorage
      const token = await AsyncStorage.getItem('token');
  
      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }
  
      const response = await fetch(`https://fe59-2804-954-39e-e500-c4e4-fe22-a64f-8b8c.ngrok-free.app/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Envia o token no cabeçalho
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar usuário: ${response.status}`);
      }
  
      const data = await response.json();
      setApiResponseUser(data);
      console.log('Usuário encontrado:', data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error.message);
      Alert.alert('Erro', 'Não foi possível buscar as informações do usuário.');
    }
  };
  
  useEffect(() => {
    const buscarUsuario = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        fetchUserById(userId);
      } else {
        Alert.alert('Erro', 'ID do usuário não encontrado. Faça login novamente.');
      }
    };
    buscarUsuario();
  }, []);  
  

  const handleFabPress = () => {
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <Header
        eye={eye}
        setEye={setEye}
        ModalPerfilVisible={ModalPerfilVisible}
        setModalPerfilVisible={setModalPerfilVisible}
        apiResponseUser={apiResponseUser}
      />

      <TabRoutes eye={eye} />

      {/* Botão Flutuante */}
      <TouchableOpacity
        style={[styles.fab, { position: 'absolute', top: '85%', right: 20 }]}
        onPress={handleFabPress}
      >
        <Icon name='terminal' size={24} color='#FFFFFF' />
      </TouchableOpacity>

      <ModalChat
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <ModalPerfil
        modalVisible={ModalPerfilVisible}
        setModalVisible={setModalPerfilVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: 60,
    height: 60,
    backgroundColor: '#D4A413',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  }
});