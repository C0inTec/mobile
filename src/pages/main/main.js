import { useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Modal, TextInput, StyleSheet } from 'react-native';
import { sendMessageToGPT, sendMessageToGemini } from '../../api/openIA'; // Certifique-se de que o serviço está configurado corretamente
import Icon from 'react-native-vector-icons/Feather';
import styles from './maisStyle';
import ModalChat from '../../components/modalChat';

export default function Main() {
  const [eye, setEye] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // Estado do modal

  const handleFabPress = () => {
    setModalVisible(true); // Abre o modal
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header da main */}
      <View style={styles.headerBox}>
        <View style={styles.headerDiv1}>
          <TouchableOpacity>
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
            Olá, Alguém!
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

      {modalVisible? <ModalChat/> :  null}

    </View>
  );
}