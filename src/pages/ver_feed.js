import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WalletCard from '../components/card_saldo_e_invest';
import ReceitaCard from '../components/cards_transacoes';
import { TransacoesContext } from '../../contexts/TransacoesContext';
import HealthCard from '../components/card_saude';

export default function Feed({eye}) {
  const { saldo, historico, totalReceitas, totalDespesas, totalInvestimentos } = useContext(TransacoesContext);
  const [loading, setLoading] = useState(true);
  const [relatorio, setRelatorio] = useState();
  const navigation = useNavigation();
  
   // Função para formatar os dados para a API
    const prepararDadosParaAPI = () => {
      const categorias = {
        "ganhos": {
          "salario": 500.00,
          "bonus": 300.00,
          "outros": 150.00,
          "freelas": 800.00,
          "dividendos": 100.00
        },
        "despesas": {
          "agua": 0,
          "celular": 0,
          "luz": 0,
          "internet": 0,
          "aluguel": 1200.00,
          "cartao": 400.00,
          "lazer": 250.00,
          "apostas": 0
        },
        "investimentos": {
          "poupanca": 0,
          "renda_variavel": 4100.00
        }
      }
      
  
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
        const resposta = await fetch('https://ia-8k38.onrender.com/classificar', {
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
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      );
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
                    title={'Receitas'}
                    value={totalReceitas? totalReceitas.toFixed(2).replace('.', ',') : 0}
                    onPress={() => navigation.navigate('Saldo', {tipo: 'receita'})}
                    color={'#00FF00'}/>

                <ReceitaCard
                    eye={eye}
                    title={'Despesas'}
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

          <HealthCard perfil={relatorio.descricao? relatorio.descricao : ''} eye={eye} onPress={() => navigation.navigate("DicasIA", {historico})}/>

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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  }
});