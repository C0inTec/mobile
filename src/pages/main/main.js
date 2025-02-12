import { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { PieChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/Feather";
import styles from "./mainStyle";

// Modais || Janelas
import ModalChat from "../../components/modalChat";
import ModalPerfil from "../../components/modals/modalPerfil";
import Header from "../../components/header/header";
import WalletCard from "../../components/cards/walletCard";
import DespesasChart from "../../components/charts/despesasChart";

export default function Main() {
  const [eye, setEye] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [ModalPerfilVisible, setModalPerfilVisible] = useState(false);
  const [apiResponseUser, setApiResponseUser] = useState("");
  const [apiResponseWallet, setApiResponseWallet] = useState("");
  const [chartData, setChartData] = useState([]); // Estado do gráfico dinâmico
  const navigation = useNavigation();

  useEffect(() => {
    // Dados genéricos para o gráfico
    const despesasData = [
      {
        name: "Contas",
        population: 400, // Valor arbitrário
        color: "#f39c12",
        legendFontColor: "#FFFFFF",
        legendFontSize: 10,
      },
      {
        name: "Comida",
        population: 300, // Valor arbitrário
        color: "#e74c3c",
        legendFontColor: "#FFFFFF",
        legendFontSize: 10,
      },
      {
        name: "Lazer",
        population: 200, // Valor arbitrário
        color: "#8e44ad",
        legendFontColor: "#FFFFFF",
        legendFontSize: 10,
      },
      {
        name: "Outros",
        population: 100, // Valor arbitrário
        color: "#3498db",
        legendFontColor: "#FFFFFF",
        legendFontSize: 10,
      },
    ];

    setChartData(despesasData);

    // Dados genéricos para o usuário e carteira
    setApiResponseUser({ first_name: "João" }); // Nome genérico
    setApiResponseWallet({ saldo: 1800.00, despesas: 1000.00 }); // Valores genéricos
  }, []);

  const handleFabPress = () => {
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header da main */}
      <Header eye={eye} setEye={setEye} ModalPerfilVisible={ModalPerfilVisible} setModalPerfilVisible={setModalPerfilVisible} apiResponseUser={apiResponseUser}/>

      {/* Div principal */}
      <ScrollView
        style={styles.mainDiv}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        keyboardShouldPersistTaps="handled"  contentInsetAdjustmentBehavior="always">
          
        <View style={styles.contentBox}>
          
          {/* Saldo em contas */}
          <WalletCard 
           title={"Saldo em contas"} 
           value={apiResponseWallet?.saldo || "0,00"}
           eye={eye}
           onPress={() => console.log("Navega para carteira de contas")}/>

          {/* Receitas */}
          <WalletCard
           title={"Receitas"}
           value={apiResponseUser?.saldo || "0,00"}
           eye={eye}
           onPress={() => navigation.navigate("Receita")}/>

          {/* Despesas */}
          <WalletCard
            title={"Despesas"}
            value={apiResponseWallet?.despesas || "0,00"}
            eye={eye}
            onPress={() => console.log("Navegue para despesas")}/>

          {/* Gráfico Dinâmico */}
          <DespesasChart chartData={chartData}/>          

        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab,{ position: "absolute", top: "85%", right: 20 },]}
        onPress={handleFabPress}>
        <Icon name="terminal" size={24} color="white" />
      </TouchableOpacity>
      

      {/* Modais */}
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