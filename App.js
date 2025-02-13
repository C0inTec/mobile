import React from 'react';
import { StyleSheet } from 'react-native';
import Routes from './src/routes/routes';
import { TransacoesProvider } from './contexts/TransacoesContext';

export default function App() {
  return (
    <TransacoesProvider>
      <Routes />
    </TransacoesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});