import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TransacoesContext } from '../../contexts/TransacoesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Saldo() {
  const route = useRoute();
  const tipo = route.params ? route.params.tipo : 'receita';
  const { saldo, historico, adicionarTransacao } = useContext(TransacoesContext);
  const [valor, setValor] = useState('0');
  const [maskedValue, setMaskedValue] = useState('R$ 0,00');
  const [descricao, setDescricao] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [tipoTransacao, setTipoTransacao] = useState(tipo);
  const navigation = useNavigation();

  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId !== null) {
        // Use o userId conforme necessário
        console.log("User ID salvo:", userId);
      }
    } catch (error) {
      console.error("Erro ao buscar o userId:", error);
    }
  };

  const formatarMoeda = (valor) => {
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const categorias = [
    { name: 'Salário', color: '#2ECC71', tipo: 'receita' },
    { name: 'Bonus', color: '#2ECC71', tipo: 'receita' },
    { name: 'Rendimentos Passivos', color: '#2ECC71', tipo: 'receita' },
    { name: 'Freelancer', color: '#2ECC71', tipo: 'receita' },
    { name: 'Dividendos', color: '#2ECC71', tipo: 'receita' },
    { name: 'Aluguel', color: '#E74C3C', tipo: 'despesa' },
    { name: 'Contas', color: '#E74C3C', tipo: 'despesa' },
    { name: 'Alimentação', color: '#E74C3C', tipo: 'despesa' },
    { name: 'Transporte', color: '#E74C3C', tipo: 'despesa' },
    { name: 'Educação', color: '#E74C3C', tipo: 'despesa' },
    { name: 'Saúde', color: '#E74C3C', tipo: 'despesa' },
    { name: 'Lazer', color: '#E74C3C', tipo: 'despesa' },
  ];

  // Função para atualizar o wallet via API
  const updateWalletTransaction = async (amount) => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');

      if (!storedUserId || !token) {
        console.error('Dados de autenticação ausentes');
        return;
      }

      // Estrutura completa conforme documentação Swagger
      const updatedPayload = {
        userId: parseInt(storedUserId), // Campo obrigatório pelo schema
        despesas: {
          aluguel: 0,
          contas: 0,
          alimentacao: 0,
          transporte: 0,
          educacao: 0,
          saude: 0,
          lazer: 0
        },
        investimento: { // Seção faltante no código anterior
          acoes: 0,
          imoveis: 0,
          criptomoedas: 0,
          rendafixa: 0,
          negocios: 0,
          fundos: 0
        },
        ganhos: {
          salario: 0,
          bonus: 0,
          rendimentosPassivos: 0,
          freelas: 0,
          dividendos: 0,
          outros: 0
        }
      };

      // Atualização condicional
      if (tipoTransacao === 'receita') {
        switch (categoriaSelecionada) {
          case 'Salário': updatedPayload.ganhos.salario += amount; break;
          case 'Bonus': updatedPayload.ganhos.bonus += amount; break;
          case 'Rendimentos Passivos': updatedPayload.ganhos.rendimentosPassivos += amount; break;
          case 'Freelancer': updatedPayload.ganhos.freelas += amount; break;
          case 'Dividendos': updatedPayload.ganhos.dividendos += amount; break;
          default: updatedPayload.ganhos.outros += amount; break;
        }
      } else {
        switch (categoriaSelecionada) {
          case 'Aluguel': updatedPayload.despesas.aluguel += amount; break;
          case 'Contas': updatedPayload.despesas.contas += amount; break;
          case 'Alimentação': updatedPayload.despesas.alimentacao += amount; break;
          case 'Transporte': updatedPayload.despesas.transporte += amount; break;
          case 'Educação': updatedPayload.despesas.educacao += amount; break;
          case 'Saúde': updatedPayload.despesas.saude += amount; break;
          case 'Lazer': updatedPayload.despesas.lazer += amount; break;
        }
      }

      const response = await fetch('https://fe59-2804-954-39e-e500-c4e4-fe22-a64f-8b8c.ngrok-free.app/wallet', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedPayload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro detalhado:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Erro na atualização:', error);
      throw error;
    }
  };

  const handleConfirm = async () => {
    if (isConfirmButtonEnabled()) {
      // Corrige a conversão do valor (remove máscara antes de converter)
      const valorLimpo = valor.replace(/[^0-9]/g, '');
      const valorNumerico = parseFloat(valorLimpo) / 100;
      const novaTransacao = {
        id: Date.now().toString(),
        descricao: descricao.slice(0, 30),
        valor: `${tipoTransacao === 'receita' ? '+' : '-'} ${formatarMoeda(valorNumerico)}`,
        cor: tipoTransacao === 'receita' ? '#00FF00' : '#FF0000',
        tipo: tipoTransacao,
        categoria: categoriaSelecionada,
        data: date,
      };

      // Adiciona a transação no contexto
      adicionarTransacao(novaTransacao, valorNumerico);

      // Atualiza o wallet com o valor da transação
      await updateWalletTransaction(valorNumerico);

      setDescricao('');
      setValor('0');
      setMaskedValue('R$ 0,00');
      setCategoriaSelecionada(null);
    }
  };

  const isConfirmButtonEnabled = () => {
    return parseFloat(valor) > 0 && descricao.trim() !== '' && categoriaSelecionada;
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
              <Icon name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Nova transação</Text>
          </View>

          <View style={styles.tipoContainer}>
            <TouchableOpacity
              style={[
                styles.tipoButton,
                tipoTransacao === 'receita' && styles.receitaSelecionada,
              ]}
              onPress={() => setTipoTransacao('receita')}
            >
              <Text style={styles.tipoButtonText}>Receita</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tipoButton,
                tipoTransacao === 'despesa' && styles.despesaSelecionada,
              ]}
              onPress={() => setTipoTransacao('despesa')}
            >
              <Text style={styles.tipoButtonText}>Despesa</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.valorContainer}>
            <Text style={styles.labelValor}>Valor da transação</Text>
            <View style={styles.inputRow}>
              <MaskedTextInput
                type="currency"
                options={{
                  prefix: 'R$ ',
                  decimalSeparator: ',',
                  groupSeparator: '.',
                  precision: 2,
                }}
                style={styles.inputValor}
                keyboardType="number-pad"
                value={valor}
                selection={{
                  start: (maskedValue || '').length,
                  end: (maskedValue || '').length,
                }}
                onChangeText={(formatted, rawText) => {
                  setValor(rawText || '0');
                  setMaskedValue(formatted);
                }}
                placeholder="00,00"
                placeholderTextColor="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.dataSection}>
            <TouchableOpacity style={styles.dataButton} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.dataButtonText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              textColor="#FFFFFF"
              themeVariant="light"
            />
          )}

          <View style={styles.categoriaContainer}>
            <Text style={styles.label}>Categoria</Text>
            <FlatList
              data={categorias.filter((cat) => cat.tipo === tipoTransacao)}
              horizontal
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.categoriaButton,
                    categoriaSelecionada === item.name && { backgroundColor: item.color },
                  ]}
                  onPress={() => setCategoriaSelecionada(item.name)}
                >
                  <Text style={styles.categoriaText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descrição (máx. 30 caracteres)</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite uma descrição"
              placeholderTextColor="#666666"
              value={descricao}
              onChangeText={setDescricao}
              maxLength={30}
            />
          </View>

          <View style={styles.saldoContainer}>
            <Text style={styles.saldoLabel}>Saldo em Contas:</Text>
            <Text
              style={[
                styles.saldoValor,
                { color: saldo > 0 ? '#00FF00' : saldo < 0 ? '#FF0000' : '#FFFFFF' },
              ]}
            >
              {formatarMoeda(saldo)}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.confirmButton,
              !isConfirmButtonEnabled() && styles.confirmButtonDisabled,
            ]}
            onPress={handleConfirm}
            activeOpacity={0.8}
            disabled={!isConfirmButtonEnabled()}
          >
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </>
      }
      data={historico}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.historicoItem}>
          <Text style={styles.historicoDescricao}>
            {new Date(item.data).toLocaleDateString()}
          </Text>
          <Text style={styles.historicoDescricao}>{item.categoria}</Text>
          <Text style={styles.historicoDescricao}>{item.descricao}</Text>
          <Text style={[styles.historicoValor, { color: item.cor }]}>{item.valor}</Text>
        </View>
      )}
      ListFooterComponent={
        <View style={{ marginBottom: 50 }} />
      }
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000',
    padding: 20,
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
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 15,
  },
  tipoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tipoButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  receitaSelecionada: {
    backgroundColor: '#00FF00',
  },
  despesaSelecionada: {
    backgroundColor: '#FF0000',
  },
  tipoButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  valorContainer: {
    marginBottom: 30,
  },
  labelValor: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputValor: {
    color: '#FFFFFF',
    fontSize: 30,
    flex: 1,
    paddingVertical: 8,
  },
  dataSection: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dataButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  dataButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  categoriaContainer: {
    marginBottom: 20,
  },
  categoriaButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    backgroundColor: '#333333',
    marginRight: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  categoriaText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    color: '#FFFFFF',
    paddingVertical: 10,
  },
  saldoContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  saldoLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 5,
  },
  saldoValor: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButtonDisabled: {
    backgroundColor: '#A9A9A9',
    opacity: 0.5,
  },
  historicoTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  historicoList: {
    flex: 1,
  },
  historicoItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  historicoDescricao: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5,
  },
  historicoValor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Saldo;