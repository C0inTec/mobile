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
import { useNavigation } from '@react-navigation/native';
import { TransacoesContext } from '../../contexts/TransacoesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Investimentos() {
    const { saldo, historico, adicionarTransacao } = useContext(TransacoesContext);
    const [valor, setValor] = useState('0');
    const [maskedValue, setMaskedValue] = useState('R$ 0,00');
    const [descricao, setDescricao] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const navigation = useNavigation();

    const categorias = [
        { name: 'Ações', color: '#3498DB' },
        { name: 'Fundos', color: '#3498DB' },
        { name: 'Criptomoedas', color: '#3498DB' },
        { name: 'Imoveis', color: '#3498DB' },
        { name: 'Renda Fixa', color: '#3498DB' },
        { name: 'Negócios', color: '#3498DB' },
    ];

    const formatarMoeda = (valor) => {
        return Number(valor).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    // Função para atualizar o wallet via API
    const updateWalletInvestment = async (amount) => {
        try {
            // Busca o userId e o token armazenados
            const storedUserId = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('token');
            if (!storedUserId) {
                console.error('User id não encontrado.');
                return;
            }
            if (!token) {
                console.error('Token não encontrado.');
                return;
            }
            console.log("Stored userId:", storedUserId);
            console.log("Token:", token);

            const numericUserId = Number(storedUserId);

            // Cria o payload com valores iniciais zerados
            const payload = {
                userId: numericUserId,
                despesas: {
                    aluguel: 0,
                    contas: 0,
                    alimentacao: 0,
                    transporte: 0,
                    educacao: 0,
                    saude: 0,
                    lazer: 0,
                },
                investimento: {
                    acoes: 0,
                    imoveis: 0,
                    criptomoedas: 0,
                    rendafixa: 0,
                    negocios: 0,
                    fundos: 0,
                },
                ganhos: {
                    salario: 0,
                    bonus: 0,
                    outros: 0,
                    rendimentosPassivos: 0,
                    freelas: 0,
                    dividendos: 0,
                },
            };

            // Mapeia a categoria selecionada para o campo correto
            switch (categoriaSelecionada) {
                case 'Ações':
                    payload.investimento.acoes = amount;
                    break;
                case 'Fundos':
                    payload.investimento.fundos = amount;
                    break;
                case 'Criptomoedas':
                    payload.investimento.criptomoedas = amount;
                    break;
                case 'Imoveis':
                    payload.investimento.imoveis = amount;
                    break;
                case 'Renda Fixa':
                    payload.investimento.rendafixa = amount;
                    break;
                case 'Negócios':
                    payload.investimento.negocios = amount;
                    break;
                default:
                    break;
            }

            // Log do payload para verificação
            console.log("Payload a ser enviado:", JSON.stringify(payload));

            // Envia a requisição incluindo o token no header Authorization
            const response = await fetch('https://fe59-2804-954-39e-e500-c4e4-fe22-a64f-8b8c.ngrok-free.app/wallet', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Token incluído aqui
                },
                body: JSON.stringify(payload),
            });

            console.log("Status da resposta:", response.status);
            const responseText = await response.text();
            console.log("Resposta da API:", responseText);

            if (!response.ok) {
                console.error('Falha ao atualizar wallet');
            } else {
                console.log('Wallet atualizado com sucesso');
            }
        } catch (error) {
            console.error('Erro ao atualizar wallet', error);
        }
    };


    const handleConfirm = async () => {
        if (isConfirmButtonEnabled()) {
            // Adicionar tratamento igual ao da tela de Saldo
            const valorLimpo = valor.replace(/[^0-9]/g, '');
            const valorNumerico = parseFloat(valorLimpo) / 100;

            const novaTransacao = {
                id: Date.now().toString(),
                descricao: descricao.slice(0, 30),
                valor: `+ ${formatarMoeda(valorNumerico)}`,
                cor: '#3498DB',
                tipo: 'investimento',
                categoria: categoriaSelecionada,
                data: date,
            };

            adicionarTransacao(novaTransacao, valorNumerico);
            await updateWalletInvestment(valorNumerico);

            setDescricao('');
            setValor('0');
            setMaskedValue('R$ 0,00');
            setCategoriaSelecionada(null);
        }
    };


    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const isConfirmButtonEnabled = () => {
        return parseFloat(valor) > 0 && descricao.trim() !== '' && categoriaSelecionada;
    };

    return (
        <FlatList
            contentContainerStyle={styles.container}
            ListHeaderComponent={
                <View>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
                            <Icon name='arrow-left' size={24} color='#FFFFFF' />
                        </TouchableOpacity>
                        <Text style={styles.title}>Novo Investimento</Text>
                    </View>

                    {/* Seção de valor */}
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

                    {/* Seletor de data */}
                    <View style={styles.dataSection}>
                        <TouchableOpacity
                            style={styles.dataButton}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={styles.dataButtonText}>{date.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode='date'
                            display='default'
                            onChange={handleDateChange}
                            textColor='#FFFFFF'
                            themeVariant='light'
                        />
                    )}

                    {/* Lista horizontal de categorias */}
                    <View style={styles.categoriaContainer}>
                        <Text style={styles.label}>Categoria</Text>
                        <FlatList
                            horizontal
                            data={categorias}
                            keyExtractor={item => item.name}
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

                    {/* Campo de descrição */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Descrição (máx. 30 caracteres)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite uma descrição'
                            placeholderTextColor='#666666'
                            value={descricao}
                            onChangeText={setDescricao}
                            maxLength={30}
                        />
                    </View>

                    {/* Botão de confirmação */}
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

                    {/* Título do histórico */}
                    <Text style={styles.historicoTitle}>Histórico de Investimentos</Text>
                </View>
            }
            data={historico.filter(item => item.tipo === 'investimento')}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.historicoItem}>
                    <Text style={styles.historicoDescricao}>
                        {new Date(item.data).toLocaleDateString()}
                    </Text>
                    <Text style={styles.historicoDescricao}>{item.categoria}</Text>
                    <Text style={styles.historicoDescricao}>{item.descricao}</Text>
                    <Text style={[styles.historicoValor, { color: '#3498DB' }]}>
                        {item.valor}
                    </Text>
                </View>
            )}
            nestedScrollEnabled={true}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#000000',
        padding: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    backButton: {
        padding: 10,
        marginRight: 10
    },
    title: {
        color: '#FFFFFF',
        fontSize: 20,
        marginLeft: 15
    },
    valorContainer: {
        marginBottom: 30
    },
    labelValor: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 10
    },
    inputValor: {
        color: '#FFFFFF',
        fontSize: 30,
        flex: 1,
        paddingVertical: 8,
    },
    categoriaContainer: {
        marginBottom: 20
    },
    categoriaButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 6,
        backgroundColor: '#333333',
        marginRight: 10
    },
    categoriaText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold'
    },
    confirmButton: {
        backgroundColor: '#FFD700',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20
    },
    confirmButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold'
    },
    confirmButtonDisabled: {
        backgroundColor: '#A9A9A9',
        opacity: 0.5
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
    historicoTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    historicoList: {
        flexGrow: 1,
    },
    historicoItem: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
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
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});