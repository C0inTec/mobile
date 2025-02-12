import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/Feather";
import styles from "./despesasChartStyle"; // Ajuste o caminho se necessário

export default function DespesasChart({ chartData }) {
  return (
    <View style={[styles.receitaChart, { marginTop: 20 }]}>
      {/* Título e botão */}
      <View style={styles.contaRow}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
          Distribuição de Despesas
        </Text>
        <TouchableOpacity>
          <Icon name="chevron-right" size={24} color="white" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>

      {/* Gráfico */}
      <View style={{ alignItems: "center", marginTop: 15 }}>
        <PieChart
          data={chartData}
          width={300}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </View>
  );
}
