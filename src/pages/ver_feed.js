import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WalletCard from '../components/walletCard';
import ReceitaCard from '../components/receitaCard';
import { TransacoesContext } from '../../contexts/TransacoesContext';
import PieLocalChart from '../components/grafico_despesas';

export default function Feed({eye}) {
  const { saldo, historico, totalReceitas, totalDespesas, totalInvestimentos } = useContext(TransacoesContext);
  const [apiResponseUser, setApiResponseUser] = useState('');
  const [chartDespesaData, setChartDespesaData] = useState([]);
  const [chartReceitaData, setChartReceitaData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const categoriasCoresDespesa = {
      "Contas": "#F39C12",
      "Comida": "#E74C3C",
      "Lazer": "#8E44AD",
      "Outros": "#3498DB"
    };
  
    const categoriasCoresReceita = {
      "Salário": "#28B463", // Verde
      "Investimentos": "#1F618D", // Azul
      "Outros": "#3498DB" // Azul (mesma cor para 'Outros' por padrão)
    };
  
    const coresQuentes = [
      "#F39C12", // Amarelo
      "#E74C3C", // Vermelho
      "#D35400", // Laranja
      "#C0392B", // Vermelho escuro
      "#F1C40F", // Amarelo dourado
      "#E67E22", // Laranja queimado
      "#D96D0F"  // Laranja escuro
    ];
  
    const coresFrias = [
      "#28B463", // Verde
      "#1F618D", // Azul
      "#5DADE2", // Azul claro
      "#48C9B0", // Verde água
      "#7D3C98", // Roxo azulado
      "#2E86C1"  // Azul escuro
    ];
  
    const coresUsadasDespesa = new Set(Object.values(categoriasCoresDespesa)); // Para evitar repetições
    const coresUsadasReceita = new Set(Object.values(categoriasCoresReceita)); // Para evitar repetições
    
    // Função para gerar cor aleatória da paleta de cores quentes (despesas)
    const gerarCorAleatoriaDespesa = () => {
      let cor;
      do {
        // Escolhe aleatoriamente uma cor da paleta de cores quentes
        cor = coresQuentes[Math.floor(Math.random() * coresQuentes.length)];
      } while (coresUsadasDespesa.has(cor)); // Garante que a cor não foi usada antes
      coresUsadasDespesa.add(cor);
      return cor;
    };
  
    // Função para gerar cor aleatória da paleta de cores frias (receitas)
    const gerarCorAleatoriaReceita = () => {
      let cor;
      do {
        // Escolhe aleatoriamente uma cor da paleta de cores frias
        cor = coresFrias[Math.floor(Math.random() * coresFrias.length)];
      } while (coresUsadasReceita.has(cor)); // Garante que a cor não foi usada antes
      coresUsadasReceita.add(cor);
      return cor;
    };
  
    const despesas = historico.filter(item => item.tipo === "despesa");
    const receitas = historico.filter(item => item.tipo === "receita");
  
    const despesasPorCategoria = {};
    const receitasPorCategoria = {};
  
    // Processa as despesas
    despesas.forEach(despesa => {
      const categoria = despesa.categoria || "Outros";
      if (!despesasPorCategoria[categoria]) {
        despesasPorCategoria[categoria] = 0;
      }
  
      // Removendo caracteres não numéricos e convertendo para número
      const valorLimpo = despesa.valor.replace(/[^0-9,-]+/g, "").replace(",", ".");
      const valorNumerico = parseFloat(valorLimpo);
  
      if (!isNaN(valorNumerico)) {
        despesasPorCategoria[categoria] += valorNumerico;
      } else {
        console.warn(`Valor inválido encontrado: ${despesa.valor}`);
      }
    });
  
    // Processa as receitas
    receitas.forEach(receita => {
      const categoria = receita.categoria || "Outros";
      if (!receitasPorCategoria[categoria]) {
        receitasPorCategoria[categoria] = 0;
      }
  
      // Removendo caracteres não numéricos e convertendo para número
      const valorLimpo = receita.valor.replace(/[^0-9,-]+/g, "").replace(",", ".");
      const valorNumerico = parseFloat(valorLimpo);
  
      if (!isNaN(valorNumerico)) {
        receitasPorCategoria[categoria] += valorNumerico;
      } else {
        console.warn(`Valor inválido encontrado: ${receita.valor}`);
      }
    });
  
    // Criando os dados para o gráfico de despesas
    const despesasDataAtualizado = Object.keys(despesasPorCategoria).map(categoria => ({
      name: categoria,
      population: despesasPorCategoria[categoria],
      color: categoriasCoresDespesa[categoria] || gerarCorAleatoriaDespesa(),
      legendFontColor: "#FFFFFF",
      legendFontSize: 10,
    }));
  
    // Criando os dados para o gráfico de receitas
    const receitasDataAtualizado = Object.keys(receitasPorCategoria).map(categoria => ({
      name: categoria,
      population: receitasPorCategoria[categoria],
      color: categoriasCoresReceita[categoria] || gerarCorAleatoriaReceita(),
      legendFontColor: "#FFFFFF",
      legendFontSize: 10,
    }));
  
    // console.log("Dados do gráfico de despesas:", despesasDataAtualizado); // Verifique os dados no console
    // console.log("Dados do gráfico de receitas:", receitasDataAtualizado); // Verifique os dados no console
  
    setChartDespesaData(despesasDataAtualizado);
    setChartReceitaData(receitasDataAtualizado);
  }, [historico]);  
  

  return (
    <View style={{ flex: 1 }}>

      <ScrollView
        style={styles.homeDiv}
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
        keyboardShouldPersistTaps='handled'
        contentInsetAdjustmentBehavior='always'
      >

        <View style={styles.contentBox}>

        <WalletCard
            title={'Saldo em contas'}
            value={saldo.toFixed(2).replace('.', ',')}
            eye={eye}
            onPress={() => navigation.navigate('Historico')}
            color={saldo >= 0 ? '#FFFFFF' : '#FF0000'}
          />

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <ReceitaCard
                    eye={eye}
                    title={'Receita'}
                    value={totalReceitas? totalReceitas.toFixed(2).replace('.', ',') : 0}
                    onPress={() => navigation.navigate('Saldo', {tipo: 'receita'})}
                    color={'#00FF00'}/>

                <ReceitaCard
                    eye={eye}
                    title={'Despesa'}
                    value={totalDespesas? totalDespesas.toFixed(2).replace('.', ',') : 0}
                    onPress={() => navigation.navigate('Saldo', {tipo: 'despesa'})}
                    color={'#FF0000'}/>
            </View>            
          

          <WalletCard
            title={'Investimentos'}
            value={totalInvestimentos? totalInvestimentos.toFixed(2).replace('.', ','): 0}
            eye={eye}
            onPress={() => navigation.navigate('Investimentos')}
            color={saldo >= 0 ? '#FFFFFF' : '#FF0000'}
          />

          <PieLocalChart titulo= {'Despesas'} chartData={chartDespesaData} />

          <PieLocalChart titulo= {'Receitas'} chartData={chartReceitaData} />

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