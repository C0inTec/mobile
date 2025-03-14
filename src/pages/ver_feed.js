import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WalletCard from '../components/walletCard';
import ReceitaCard from '../components/receitaCard';
import { TransacoesContext } from '../../contexts/TransacoesContext';
import PieLocalChart from '../components/grafico_despesas';
import HealthCard from '../components/saudeCard';

export default function Feed({eye}) {
  const { saldo, historico, totalReceitas, totalDespesas, totalInvestimentos } = useContext(TransacoesContext);
  const [loading, setLoading] = useState(true);
  const [relatorio, setRelatorio] = useState();
  const navigation = useNavigation();
  
   // Função para formatar os dados para a API
    const prepararDadosParaAPI = () => {
      const categorias = {"Água":0,"Celular":0,"Luz":0,"Internet":0,"Aluguel":0,"Cartão":0,"Lazer":0,"Apostas":0,"Emprego Fixo":0,"Bicos":0}
  
      historico.forEach(({ categoria, valor }) => {
        const valorNumerico = parseFloat(valor.replace(/[+\-R$\s]/g, '').replace(',', '.'));
        if (categorias.hasOwnProperty(categoria)) {
          categorias[categoria] += valorNumerico;
        }
      });

      console.log(categorias)
  
      return categorias;
    };
  
    // Consulta a API Flask
    const consultarAPI = async () => {
      try {
        const payload = prepararDadosParaAPI();
        const resposta = await fetch('http://192.168.1.7:5000/classificar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const resultado = await resposta.json();
        setRelatorio(resultado);
      } catch (erro) {
        console.error('Erro ao consultar a API:', erro);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      consultarAPI();
    }, [historico]);
  
    if (loading) {
      return <ActivityIndicator size="large" color="#FFFFFF" />;
    }

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

          <HealthCard perfil={relatorio.descricao} eye={eye} onPress={() => console.log("Tela de Dica") }/>

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