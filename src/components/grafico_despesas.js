import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function PieLocalChart({ titulo, chartData }) {
  const navigation = useNavigation();
  
  return (
    <View style={[styles.receitaChart, { marginTop: 20 }]}>
      <TouchableOpacity onPress={() => navigation.navigate('Despesa')}>
        {/* Título e botão */}
        <View style={styles.contaRow}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>
            Distribuição de {titulo}
          </Text>
            <Icon name='chevron-right' size={24} color='#FFFFFF' style={{ marginLeft: 10 }} />
        </View>

        {/* Gráfico ou mensagem */}
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          {chartData && chartData.length > 0 ? (
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
          ) : (
            <Text style={{ fontSize: 16, color: '#808080', fontWeight: 'bold', marginTop: 70}}>
              Nenhum dado disponível para exibição.
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  receitaChart: {
    backgroundColor: '#000000',
    width: '100%',
    height: 290,
    borderColor: '#C0C0C0',
    borderWidth: 1.5,
    borderRadius: 10,
    marginTop: 15,
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
});