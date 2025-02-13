// components/SaldoCard.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const ValorText = ({ eye, value, color }) => (
  <Text style={[styles.valorText, { color }]}>
    {eye ? `R$ ${value}` : "•••••"}
  </Text>
);

export default function ReceitaCard({ title, value, eye, onPress, color }) {
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

const corPrimaria = '#d4a413';
const corSecundaria = '#0a0a0a';
const corTexto = 'white';
const corBorda = '#c0c0c0';
const corPreta = 'black';

const styles = StyleSheet.create({
  receitaComponent: {
    backgroundColor: corPreta,
    width: '45%',
    height: 85,
    borderColor: corBorda,
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "#FFD700", // Amarelo-dourado
    shadowOffset: {
        width: 5,
        height: 10, // Profundidade da sombra
    },
    shadowOpacity: 0.1, // Opacidade da sombra
    shadowRadius: 6, // Raio da sombra
    elevation: 10, // Para Android (sombra mais visível)
  },
  contaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  contaText: {
    color: corTexto,
    fontSize: 17,
    fontWeight: 'bold',
  },
  valorText: {
    fontSize: 17,
    paddingHorizontal: 10,
    color: corTexto,
    fontWeight: 'bold',
    marginTop: 5,
  },
});