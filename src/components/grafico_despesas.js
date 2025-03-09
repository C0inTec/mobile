import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function DespesasChart({ chartData }) {
    const navigation = useNavigation();
  
  return (
    <View style={[styles.receitaChart, { marginTop: 20 }]}>
      {/* Título e botão */}
      <View style={styles.contaRow}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>
          Distribuição de Despesas
        </Text>
        <TouchableOpacity onPress={()=> navigation.navigate('Despesa')}>
          <Icon name='chevron-right' size={24} color='#FFFFFF' style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>

      {/* Gráfico */}
      <View style={{ alignItems: 'center', marginTop: 15 }}>
        <PieChart
          data={chartData}
          width={300}
          height={220}
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor='population'
          backgroundColor='transparent'
          paddingLeft='15'
          absolute
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  receitaChart: {
    backgroundColor: '#000000',
    width: '100%',
    height: 290,  // Remova as aspas do número
    borderColor: '#C0C0C0',
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 15,
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
});