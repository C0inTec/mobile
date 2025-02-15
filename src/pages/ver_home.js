import React, { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Feather";

import ModalChat from "../components/modalChat";
import ModalPerfil from "../components/modals/modalPerfil";
import Header from "../components/header/header";
import WalletCard from "../components/cards/walletCard";
import DespesasChart from "../components/charts/despesasChart";

import { TransacoesContext } from '../../contexts/TransacoesContext';

export default function Home() {
  const { saldo } = useContext(TransacoesContext);
  const [eye, setEye] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [ModalPerfilVisible, setModalPerfilVisible] = useState(false);
  const [apiResponseUser, setApiResponseUser] = useState("");
  const [apiResponseWallet, setApiResponseWallet] = useState("");
  const [chartData, setChartData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const despesasData = [
      {
        name: "Contas",
        population: 400,
        color: "#F39C12",
        legendFontColor: "#FFFFFF",
        legendFontSize: 10,
      },
      {
        name: "Comida",
        population: 300,
        color: "#E74C3C",
        legendFontColor: "#FFFFFF",
        legendFontSize: 10,
      },
      {
        name: "Lazer",
        population: 200,
        color: "#8E44AD",
        legendFontColor: "#FFFFFF",
        legendFontSize: 10,
      },
      {
        name: "Outros",
        population: 100,
        color: "#3498DB",
        legendFontColor: "#FFFFFF",
        legendFontSize: 10,
      },
    ];

    setChartData(despesasData);
    setApiResponseUser({ first_name: "João" });
  }, []);

  const handleFabPress = () => {
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        eye={eye}
        setEye={setEye}
        ModalPerfilVisible={ModalPerfilVisible}
        setModalPerfilVisible={setModalPerfilVisible}
        apiResponseUser={apiResponseUser}
      />

      <ScrollView
        style={styles.homeDiv}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="always"
      >
        <View style={styles.contentBox}>
          <WalletCard
            title={"Saldo em contas"}
            value={saldo.toFixed(2).replace('.', ',')}
            eye={eye}
            onPress={() => navigation.navigate("Saldo")}
            color={saldo >= 0 ? '#FFFFFF' : '#FF0000'}
          />

          <DespesasChart chartData={chartData} />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, { position: "absolute", top: "85%", right: 20 }]}
        onPress={handleFabPress}
      >
        <Icon name="terminal" size={24} color="#FFFFFF" />
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBox: {
    backgroundColor: '#D4A413',
    height: '25%',
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
    marginTop: '10%',
    flexDirection: 'row',
    fontSize: 20,
  },
  homeDiv: {
    backgroundColor: '#0A0A0A',
    minHeight: '100%',
    width: '100%',
    height: '100%',
  },
  contentBox: {
    backgroundColor: '#0A0A0A',
    width: '90%',
    height: '100%',
    alignSelf: 'center',
  },
  receitaComponent: {
    backgroundColor: '#000000',
    width: '100%',
    height: '10%',
    borderColor: '#C0C0C0',
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 15,
  },
  receitaChart: {
    backgroundColor: '#000000',
    width: '100%',
    height: '35%',
    borderColor: '#C0C0C0',
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 15,
  },
  contaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  contaText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  valorText: {
    fontSize: 17,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 5,
  },
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
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatBox: {
    width: '90%',
    height: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    paddingBottom: 10,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  messageArea: {
    flex: 1,
    paddingVertical: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    paddingTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#000000',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#D4A413',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});