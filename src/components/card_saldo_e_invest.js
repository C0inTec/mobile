// components/SaldoCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ValorText = ({ eye, value, color }) => (
  <Text style={[styles.valorText, { color }]}>
    {eye ? `R$ ${value}` : '•••••'}
  </Text>
);

export default function WalletCard({ title, value, eye, onPress, color }) {
  return (
    <View style={styles.receitaComponent}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.contaRow}>
          <Text style={styles.contaText}>{title}</Text>
            {title === "Investimentos"?
            <Icon name='trending-up' size={29} color='#FFFFFF' />
            :
            <Icon name='chevron-right' size={30} color='#FFFFFF' />
            }
        </View>
        <ValorText eye={eye} value={value} color={title==="Investimentos"? "#3498DB" : color} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  receitaComponent: {
    backgroundColor: '#000000',
    width: '100%',
    height: 85,
    borderColor: '#C0C0C0',
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#FFD700', // Amarelo-dourado
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
});