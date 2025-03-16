// components/Header.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Header({ eye, setEye, apiResponseUser, setModalPerfilVisible, ModalPerfilVisible }) {
  return (
    <View style={styles.headerBox}>
      <View style={styles.headerDiv1}>
        <TouchableOpacity onPress={() => setModalPerfilVisible(!ModalPerfilVisible)}>
          <Image source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }} style={{ width: 55, height: 55, borderRadius: 50 }} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <TouchableOpacity onPress={() => setEye(!eye)}>
            <Icon name={eye ? 'eye-off' : 'eye'} size={26} color='#000000' />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setModalPerfilVisible(!ModalPerfilVisible)}>
            <Icon name='settings' size={26} color='#000000' />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerDiv2}>
        <Text style={{ fontSize: 18, color: '#000000', fontWeight: 'bold' }}>
          Olá, {apiResponseUser?.first_name || 'Usuário'}!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    backgroundColor: '#D4A413',
    height: '18%',
    width: '100%',
  },
  headerDiv1: {
    marginHorizontal: '8%',
    marginTop: '13%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerDiv2: {
    marginHorizontal: '8%',
    marginTop: '5%',
    flexDirection: 'row',
    fontSize: 20,
  }
});