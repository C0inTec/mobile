// contexts/TransacoesContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TransacoesContext = createContext();

export const TransacoesProvider = ({ children }) => {
  const [saldo, setSaldo] = useState(0);
  const [historico, setHistorico] = useState([]);

  // Carregar dados salvos ao iniciar
  const carregarDados = async () => {
    try {
      const saldoSalvo = await AsyncStorage.getItem('@saldo');
      const historicoSalvo = await AsyncStorage.getItem('@historico');
      
      if(saldoSalvo) setSaldo(Number(saldoSalvo));
      if(historicoSalvo) setHistorico(JSON.parse(historicoSalvo));
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

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    salvarDados();
  }, [saldo, historico]);

  const adicionarTransacao = (novaTransacao, valorNumerico) => {
    setHistorico(prev => [novaTransacao, ...prev]);
    setSaldo(prev => prev + (novaTransacao.tipo === 'receita' ? valorNumerico : -valorNumerico));
  };

  return (
    <TransacoesContext.Provider value={{ saldo, historico, adicionarTransacao }}>
      {children}
    </TransacoesContext.Provider>
  );
};