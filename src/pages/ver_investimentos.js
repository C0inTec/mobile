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

    const handleConfirm = () => {
        if (isConfirmButtonEnabled()) {
            const valorNumerico = parseFloat(valor) / 100;
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
            setDescricao('');
            setValor('0');
            setMaskedValue('R$ 0,00');
            setCategoriaSelecionada(null);
        }
    };

    const handleDateChange = (selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const isConfirmButtonEnabled = () => {
        return parseFloat(valor) > 0 && descricao.trim() !== '' && categoriaSelecionada;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
                    <Icon name='arrow-left' size={24} color='#FFFFFF' />
                </TouchableOpacity>
                <Text style={styles.title}>Novo Investimento</Text>
            </View>

            <View style={styles.valorContainer}>
                <Text style={styles.labelValor}>Valor do Investimento</Text>
                <MaskedTextInput
                    type='currency'
                    options={{ prefix: 'R$ ', decimalSeparator: ',', groupSeparator: '.', precision: 2 }}
                    style={styles.inputValor}
                    keyboardType='number-pad'
                    value={valor}
                    onChangeText={(formatted, rawText) => {
                        setValor(rawText || '0');
                        setMaskedValue(formatted);
                    }}
                />
            </View>

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

            <View style={styles.categoriaContainer}>
                <Text style={styles.label}>Categoria</Text>
                <FlatList
                    data={categorias}
                    horizontal
                    keyExtractor={item => item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.categoriaButton, categoriaSelecionada === item.name && { backgroundColor: item.color }]}
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
                    placeholder='Digite uma descrição'
                    placeholderTextColor='#666666'
                    value={descricao}
                    onChangeText={setDescricao}
                    maxLength={30}
                />
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

            <Text style={styles.historicoTitle}>Histórico de Investimentos</Text>
            <FlatList
                data={historico.filter(item => item.tipo === 'investimento')}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.historicoItem}>
                        <Text style={styles.historicoDescricao}>{item.data.toLocaleDateString()}</Text>
                        <Text style={styles.historicoDescricao}>{item.categoria}</Text>
                        <Text style={styles.historicoDescricao}>{item.descricao}</Text>
                        <Text style={[styles.historicoValor, { color: '#3498DB' }]}>
                            {item.valor}
                        </Text>
                    </View>
                )}
                style={styles.historicoList}
            />
        </ScrollView>
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
        paddingVertical: 8
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
        ontWeight: 'bold'
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
        alignSelf: 'left',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    historicoList: {
        flexGrow: 1,
    },
    historicoItem: {
        flexDirection: 'column',
        justifyContent: 'left',
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
});
