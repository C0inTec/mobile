// components/SaldoCard.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import styles from "./cardStyles";

const ValorText = ({ eye, value, color }) => (
  <Text style={[styles.valorText, { color }]}>
    {eye ? `R$ ${value}` : "•••••"}
  </Text>
);

export default function WalletCard({ title, value, eye, onPress, color }) {
  return (
    <View style={styles.receitaComponent}>
      <View style={styles.contaRow}>
        <Text style={styles.contaText}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Icon name="chevron-right" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <ValorText eye={eye} value={value} color={color} />
    </View>
  );
}