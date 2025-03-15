import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { sendMessageToGemini } from '../Google_IA/gemini';

export default function DicasIA() {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [perfil, setPerfil] = useState('');
  const [dicas, setDicas] = useState('');
  const [error, setError] = useState(null);

  const historico = route.params?.historico;

  // Dados fictícios do usuário (substitua pelos dados reais)
  const dadosUsuario = {
    Aluguel: 750,
    Apostas: 0,
    Bicos: 0,
    Cartão: 0,
    Celular: 0,
    "Emprego Fixo": 0,
    Internet: 0,
    Lazer: 0,
    Luz: 0,
    Água: 0,
  };

  // Função para buscar o perfil e as dicas da IA
  const buscarDicas = async () => {
    try {
      setLoading(true);
      setError(null);

      // Envia os dados do usuário para a API do Gemini
      const resposta = await sendMessageToGemini(
        `Analise o seguinte perfil financeiro e forneça uma descrição do perfil e me dê dicas de melhoria:
        Quero que o retorno seja exatamente igual a esse =>  {Descrição do perfil} {Listas que sigam esse formado: 1 - dica 2 dica ...
        } e não coloque titulo acima dessas coisas ou seja. não coloque o titulo de descrição, nem o de dicas. Apenas me envie puro${JSON.stringify(
          historico
        )}`
      );

      // Separa a descrição do perfil e as dicas (ajuste conforme o formato da resposta da API)
      const [descricaoPerfil, dicasPerfil] = resposta.split('\n\n');

      setPerfil(descricaoPerfil);
      console.log(dicasPerfil)
      setDicas(dicasPerfil);
    } catch (erro) {
      console.error('Erro ao buscar dicas:', erro);
      setError('Erro ao carregar dicas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Busca as dicas ao carregar a tela
  useEffect(() => {
    buscarDicas();
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton} >
          <Icon name='arrow-left' size={24} color='#FFFFFF' />
        </TouchableOpacity>
        <Text style={styles.titleTop}>Dicas IA</Text>
      </View>

      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFFFFF" style={styles.loading} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View style={styles.content}>
            <Text style={styles.title}>Seu Perfil Financeiro</Text>
            <Text style={styles.description}>{perfil}</Text>

            <Text style={styles.title}>Dicas para Melhorar</Text>
            <Text style={styles.description}>{dicas}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  content: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 20,
    lineHeight: 20,
  },
  loading: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  titleTop: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 15,
  },
});