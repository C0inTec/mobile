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
    // Iniciar todos valores zerados
    const categorias = {
      "ganhos": {
        "salario": 0,
        "bonus": 0,
        "outros": 0,
        "rendimentosPassivos": 0,
        "freelas": 0,
        "dividendos": 0
      },
      "despesas": {
        "aluguel": 0,
        "contas": 0,
        "alimentacao": 0,
        "transporte": 0,
        "educacao": 0,
        "saude": 0,
        "lazer": 0
      },
      "investimentos": {
        "acoes": 0,
        "fundos": 0,
        "criptomoedas": 0,
        "imoveis": 0,
        "rendafixa": 0,
        "negocios": 0
      }
    }
  
    // Mapeamento correto das categorias
    historico.forEach(({ categoria, valor, tipo }) => {
      const valorNumerico = parseFloat(valor.replace(/[+\-R$\s]/g, '').replace(',', '.').replace(' ', ''));
      
      const mapCategorias = {
        'Salário': ['ganhos', 'salario'],
        'Bonus': ['ganhos', 'bonus'],
        'Rendimentos Passivos': ['ganhos', 'rendimentosPassivos'],
        'Freelancer': ['ganhos', 'freelas'],
        'Dividendos': ['ganhos', 'dividendos'],
        'Aluguel': ['despesas', 'aluguel'],
        'Contas': ['despesas', 'contas'],
        'Alimentação': ['despesas', 'alimentacao'],
        'Transporte': ['despesas', 'transporte'],
        'Educação': ['despesas', 'educacao'],
        'Saúde': ['despesas', 'saude'],
        'Lazer': ['despesas', 'lazer'],
        'Ações': ['investimentos', 'acoes'],
        'Fundos Imobiliários': ['investimentos', 'fundos'],
        'Criptomoedas': ['investimentos', 'criptomoedas'],
        'Imóveis': ['investimentos', 'imoveis'],
        'Renda Fixa': ['investimentos', 'rendafixa'],
        'Negócios': ['investimentos', 'negocios']
      };
  
      if (mapCategorias[categoria]) {
        const [grupo, campo] = mapCategorias[categoria];
        categorias[grupo][campo] += Math.abs(valorNumerico);
      }
    });
  
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