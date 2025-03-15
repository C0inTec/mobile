import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PieLocalChart from '../components/grafico_despesas';
import { TransacoesContext } from '../../contexts/TransacoesContext';

export default function Relatorio() {

  const navigation = useNavigation();
  const { historico } = useContext(TransacoesContext);
  const [chartDespesaData, setChartDespesaData] = useState([]);
  const [chartReceitaData, setChartReceitaData] = useState([]);

  useEffect(() => {
    const categoriasCoresDespesa = {
      "Contas": "#F39C12",
      "Comida": "#E74C3C",
      "Lazer": "#8E44AD",
      "Outros": "#3498DB"
    };

    const categoriasCoresReceita = {
      "Salário": "#28B463",
      "Investimentos": "#1F618D",
      "Outros": "#3498DB"
    };

    const coresQuentes = [
      "#F39C12",
      "#E74C3C",
      "#D35400",
      "#C0392B",
      "#F1C40F",
      "#E67E22",
      "#D96D0F"
    ];

    const coresFrias = [
      "#28B463",
      "#1F618D",
      "#5DADE2",
      "#48C9B0",
      "#7D3C98",
      "#2E86C1"
    ];

    const coresUsadasDespesa = new Set(Object.values(categoriasCoresDespesa));
    const coresUsadasReceita = new Set(Object.values(categoriasCoresReceita));

    const gerarCorAleatoriaDespesa = () => {
      let cor;
      do {
        cor = coresQuentes[Math.floor(Math.random() * coresQuentes.length)];
      } while (coresUsadasDespesa.has(cor));
      coresUsadasDespesa.add(cor);
      return cor;
    };

    const gerarCorAleatoriaReceita = () => {
      let cor;
      do {
        cor = coresFrias[Math.floor(Math.random() * coresFrias.length)];
      } while (coresUsadasReceita.has(cor));
      coresUsadasReceita.add(cor);
      return cor;
    };

    const despesas = historico.filter(item => item.tipo === "despesa");
    const receitas = historico.filter(item => item.tipo === "receita");

    const despesasPorCategoria = {};
    const receitasPorCategoria = {};

    despesas.forEach(despesa => {
      const categoria = despesa.categoria || "Outros";
      if (!despesasPorCategoria[categoria]) {
        despesasPorCategoria[categoria] = 0;
      }
      const valorLimpo = despesa.valor.replace(/[^0-9,-]+/g, "").replace(",", ".");
      const valorNumerico = parseFloat(valorLimpo);
      if (!isNaN(valorNumerico)) {
        despesasPorCategoria[categoria] += valorNumerico;
      } else {
        console.warn(`Valor inválido encontrado: ${despesa.valor}`);
      }
    });

    receitas.forEach(receita => {
      const categoria = receita.categoria || "Outros";
      if (!receitasPorCategoria[categoria]) {
        receitasPorCategoria[categoria] = 0;
      }
      const valorLimpo = receita.valor.replace(/[^0-9,-]+/g, "").replace(",", ".");
      const valorNumerico = parseFloat(valorLimpo);
      if (!isNaN(valorNumerico)) {
        receitasPorCategoria[categoria] += valorNumerico;
      } else {
        console.warn(`Valor inválido encontrado: ${receita.valor}`);
      }
    });

    const despesasDataAtualizado = Object.keys(despesasPorCategoria).map(categoria => ({
      name: categoria,
      population: despesasPorCategoria[categoria],
      color: categoriasCoresDespesa[categoria] || gerarCorAleatoriaDespesa(),
      legendFontColor: "#FFFFFF",
      legendFontSize: 10,
    }));

    const receitasDataAtualizado = Object.keys(receitasPorCategoria).map(categoria => ({
      name: categoria,
      population: receitasPorCategoria[categoria],
      color: categoriasCoresReceita[categoria] || gerarCorAleatoriaReceita(),
      legendFontColor: "#FFFFFF",
      legendFontSize: 10,
    }));

    setChartDespesaData(despesasDataAtualizado);
    setChartReceitaData(receitasDataAtualizado);
  }, [historico]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000000' }}>
      <View style={styles.contentBox}>
        <PieLocalChart titulo={'Despesas'} chartData={chartDespesaData} />
        <PieLocalChart titulo={'Receitas'} chartData={chartReceitaData} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentBox: {
    backgroundColor: '#0A0A0A',
    width: '90%',
    height: '100%',
    alignSelf: 'center',
  }
});