import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TransacoesContext = createContext();

export const TransacoesProvider = ({ children }) => {
  const [saldo, setSaldo] = useState(0);
  const [historico, setHistorico] = useState([]);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);

  // Carregar dados salvos ao iniciar
  const carregarDados = async () => {
    try {
      const saldoSalvo = await AsyncStorage.getItem('@saldo');
      const historicoSalvo = await AsyncStorage.getItem('@historico');
  
      if (saldoSalvo) setSaldo(Number(saldoSalvo));
      if (historicoSalvo) {
        const historicoParseado = JSON.parse(historicoSalvo);
        setHistorico(historicoParseado);
        calcularTotais(historicoParseado);
      } else {
        setTotalReceitas(0);
        setTotalDespesas(0);
      }
    } catch (e) {
      console.error('Erro ao carregar dados:', e);
    }
  };
  
  

  // Salvar dados quando houver alterações
  const salvarDados = async () => {
    try {
      await AsyncStorage.setItem('@saldo', saldo.toString());
      await AsyncStorage.setItem('@historico', JSON.stringify(historico));
    } catch (e) {
      console.error('Erro ao salvar dados:', e);
    }
  };

  // Calcular receitas e despesas totais
  const calcularTotais = (historicoAtual) => {
    if (!historicoAtual || historicoAtual.length === 0) {
      setTotalReceitas(0);
      setTotalDespesas(0);
      return;
    }
  
    const receitas = historicoAtual
    .filter(transacao => transacao.tipo === 'receita')
    .reduce((total, transacao) => {
      const valorNumerico = parseFloat(
        transacao.valor
          .replace(/[^\d,.-]/g, '')
          .replace(',', '.')
      );
      return total + (valorNumerico || 0);
    }, 0);
  
  const despesas = historicoAtual
    .filter(transacao => transacao.tipo === 'despesa')
    .reduce((total, transacao) => {
      const valorNumerico = parseFloat(
        transacao.valor
          .replace(/[^\d,.-]/g, '')
          .replace(',', '.')
      );
      return total + (valorNumerico || 0);
    }, 0);
 
  
  
    setTotalReceitas(receitas || 0);
    setTotalDespesas(despesas || 0);
  };  

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    salvarDados();
    calcularTotais(historico);
  }, [saldo, historico]);

  const adicionarTransacao = (novaTransacao, valorNumerico) => {
    console.log('Nova transação:', novaTransacao);  // Verifique a transação que está sendo adicionada
  
    setHistorico(prev => {
      const novoHistorico = [novaTransacao, ...prev];
      calcularTotais(novoHistorico);
      return novoHistorico;
    });
  
    setSaldo(prev => prev + (novaTransacao.tipo === 'receita' ? valorNumerico : -valorNumerico));
  };
  

  return (
    <TransacoesContext.Provider value={{ saldo, historico, totalReceitas, totalDespesas, adicionarTransacao }}>
      {children}
    </TransacoesContext.Provider>
  );
};
