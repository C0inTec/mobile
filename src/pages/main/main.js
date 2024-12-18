import { useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './maisStyle';

import conection from '../../api/mainAPI';

// Modais || Janelas
import ModalChat from '../../components/modalChat';
import ModalPerfil from '../../components/modals/modalPerfil';

export default function Main() {
  const [eye, setEye] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // Estado do modal de chat
  const [ModalPerfilVisible, setModalPerfilVisible] = useState(false)

  const handleFabPress = () => {
    setModalVisible(true); // Abre o modal
  };

  console.log(conection())

  return (
    <View style={{ flex: 1 }}>
      {/* Header da main */}
      <View style={styles.headerBox}>
        <View style={styles.headerDiv1}>
          <TouchableOpacity onPress={() => setModalPerfilVisible(!ModalPerfilVisible)}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
              style={{ width: 55, height: 55, borderRadius: 50 }}
            />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <TouchableOpacity onPress={() => setEye(!eye)}>
              {eye ? (
                <Icon name="eye-off" size={26} color="white" />
              ) : (
                <Icon name="eye" size={26} color="white" />
              )}
            </TouchableOpacity>

            <TouchableOpacity>
              <Icon name="settings" size={26} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.headerDiv2}>
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
            Olá, Waldemar!
          </Text>
        </View>
      </View>

      {/* Div principal */}
      <ScrollView
        style={styles.mainDiv}
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
      >
        <View style={styles.contentBox}>
          {/* Gastos component */}
          <View style={styles.gastosComponent}>
            <View style={styles.contaRow}>
              <Text style={styles.contaText}>Gastos no mês</Text>
              <TouchableOpacity>
                <Icon name="chevron-right" size={30} color="white" />
              </TouchableOpacity>
            </View>

            <Text style={styles.valorText}>
              {eye ? 'R$ 100,00' : 'R$ ...'}
            </Text>
          </View>

          {/* FAB */}
          <TouchableOpacity
            style={[styles.fab, { position: 'absolute', top: '60%', right: 20 }]}
            onPress={handleFabPress}
          >
            <Icon name="terminal" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Passando estado e função de controle para os modais */}
      <ModalChat
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}/>

      <ModalPerfil
        modalVisible={ModalPerfilVisible}
        setModalVisible={setModalPerfilVisible}/>
      
    </View>
  );
}