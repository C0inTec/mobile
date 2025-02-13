import React, { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Feather";

import WalletCard from "../components/cards/walletCard";
import DespesasChart from "../components/charts/despesasChart";

import { TransacoesContext } from '../../contexts/TransacoesContext';

export default function Feed({eye}) {
  const { saldo } = useContext(TransacoesContext);
  const [apiResponseUser, setApiResponseUser] = useState("");
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

  return (
    <View style={{ flex: 1 }}>

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
    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});