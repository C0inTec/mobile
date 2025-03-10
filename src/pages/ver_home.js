import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import ModalChat from '../components/chat_bot';
import ModalPerfil from '../components/config_perfil';
import Header from '../components/header';
import TabRoutes from '../routes/tabRoutes';

export default function Home() {
  const navigation = useNavigation();
  const [eye, setEye] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [ModalPerfilVisible, setModalPerfilVisible] = useState(false);
  const [apiResponseUser, setApiResponseUser] = useState('');
  const [ChartDara, setChartData] = useState([]);

  useEffect(() => {
    const despesasData = [
      {
        name: 'Contas',
        population: 400,
        color: '#F39C12',
        legendFontColor: '#FFFFFF',
        legendFontSize: 10,
      },
      {
        name: 'Comida',
        population: 300,
        color: '#E74C3C',
        legendFontColor: '#FFFFFF',
        legendFontSize: 10,
      },
      {
        name: 'Lazer',
        population: 200,
        color: '#8E44AD',
        legendFontColor: '#FFFFFF',
        legendFontSize: 10,
      },
      {
        name: 'Outros',
        population: 100,
        color: '#3498DB',
        legendFontColor: '#FFFFFF',
        legendFontSize: 10,
      },
    ];

    setChartData(despesasData);
    setApiResponseUser({ first_name: 'João' });
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