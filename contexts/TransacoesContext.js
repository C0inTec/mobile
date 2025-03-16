import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TransacoesContext = createContext();

export const TransacoesProvider = ({ children }) => {
  const [saldo, setSaldo] = useState(0);
  const [historico, setHistorico] = useState([]);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [totalInvestimentos, setTotalInvestimentos] = useState(0);

  // console.log(historico)

  // APAGAR REGISTROS
  // useEffect(() => {
  //   const resetStorage = async () => {
  //     await AsyncStorage.clear();
  //     console.log('AsyncStorage resetado!');
  //   };
  
  //   resetStorage();
  // }, []); 


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
        setTotalInvestimentos(0);
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

  // Calcular receitas, despesas e investimentos totais
  const calcularTotais = (historicoAtual) => {
    if (!historicoAtual || historicoAtual.length === 0) {
      setTotalReceitas(0);
      setTotalDespesas(0);
      setTotalInvestimentos(0);
      return;
    }
  
    const calcularTotal = (tipo) => historicoAtual
      .filter(transacao => transacao.tipo === tipo)
      .reduce((total, transacao) => {
        const valorNumerico = parseFloat(
          transacao.valor.replace(/[^\d,.-]/g, '').replace(',', '.')
        );
        return total + (valorNumerico || 0);
      }, 0);
  
    setTotalReceitas(calcularTotal('receita') || 0);
    setTotalDespesas(calcularTotal('despesa') || 0);
    setTotalInvestimentos(calcularTotal('investimento') || 0);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    salvarDados();
    calcularTotais(historico);
  }, [saldo, historico]);

  const adicionarTransacao = (novaTransacao, valorNumerico) => {
    setHistorico(prev => {
      const novoHistorico = [novaTransacao, ...prev];
      calcularTotais(novoHistorico);
      return novoHistorico;
    });
  
    setSaldo(prev => {
      if (novaTransacao.tipo === 'receita') return prev + valorNumerico;
      if (novaTransacao.tipo === 'despesa' || novaTransacao.tipo === 'investimento') return prev - valorNumerico;
      return prev;
    });
  };

  return (
    <TransacoesContext.Provider value={{ saldo, historico, totalReceitas, totalDespesas, adicionarTransacao, totalInvestimentos }}>
      {children}
    </TransacoesContext.Provider>
  );
};
