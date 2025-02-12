// components/SaldoCard.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import styles from "./cardStyles";

export default function WalletCard({ title, value, eye, onPress }) {
  return (
    <View style={styles.receitaComponent}>
      <View style={styles.contaRow}>
        <Text style={styles.contaText}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Icon name="chevron-right" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.valorText}>{eye ? `R$ ${value || "0,00"}` : "R$ ..."}</Text>
    </View>
  );
}
