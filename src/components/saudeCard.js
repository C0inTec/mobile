// components/SaldoCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ValorText = ({ eye, value, color }) => (
  <Text style={[styles.valorText, { color }]}>
    {eye ? `R$ ${value}` : '•••••'}
  </Text>
);

const getIconByPerfil = (perfil) => {
  switch (perfil) {
    case "Econômico: Gasta pouco e economiza bem, mas falta investir.":
      return 'trending-down';
    case "Equilibrado: Gasta de forma controlada e mantém uma boa organização financeira.":
      return 'check-circle';
    case "Gastador: Gasta muito e pode ter desperdícios, precisa de mais controle financeiro.":
      return 'alert-triangle';
    case "Corrido: Gasta muito com finanças necessárias, não desperdiça e tem pouco dinheiro sobrando.":
      return 'clock';
    default:
      return 'help-circle';
  }
};

const getStyleByPerfil = (perfil) => {
  switch (perfil) {
    case "Econômico: Gasta pouco e economiza bem, mas falta investir.":
      return { color: '#32CD32', fontWeight: 'bold' }; // Verde
    case "Equilibrado: Gasta de forma controlada e mantém uma boa organização financeira.":
      return { color: '#1E90FF', fontWeight: 'bold' }; // Azul
    case "Gastador: Gasta muito e pode ter desperdícios, precisa de mais controle financeiro.":
      return { color: '#FF4500', fontWeight: 'bold' }; // Laranja
    case "Corrido: Gasta muito com finanças necessárias, não desperdiça e tem pouco dinheiro sobrando.":
      return { color: '#FFD700', fontWeight: 'bold' }; // Amarelo
    default:
      return { color: '#FFFFFF', fontWeight: 'bold' }; // Branco
  }
};

const extractPerfilTitle = (perfil) => perfil.split(":")[0];
const extractPerfilDescription = (perfil) => perfil.split(":")[1]?.trim();

export default function HealthCard({ perfil, eye, onPress }) {
  return (
    <View style={[styles.receitaComponent, { height: eye ? 200 : 85 }]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.contaRow}>
          <Text style={styles.contaText}>Saúde Financeira</Text>
          <Icon name='activity' size={29} color='#FFFFFF' />
        </View>
        {eye ? (
          <>
            <Text style={[styles.valorText, getStyleByPerfil(perfil)]}>{extractPerfilTitle(perfil)}</Text>
            <Text style={styles.descricaoText}>{extractPerfilDescription(perfil)}</Text>
            <Icon
              name={getIconByPerfil(perfil)}
              size={40}
              color='#FFFFFF'
              style={styles.iconStyle}
            />
          </>
        ) : (
          <Text style={styles.valorText}>•••••</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  receitaComponent: {
    backgroundColor: '#000000',
    width: '100%',
    borderColor: '#C0C0C0',
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
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
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 17,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 5,
  },
  descricaoText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    color: '#C0C0C0',
    marginTop: 5,
  },
  iconStyle: {
    alignSelf: 'center',
    marginTop: 10,
  },
});