import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { TransacoesContext } from '../../contexts/TransacoesContext';
import Icon from 'react-native-vector-icons/Feather';

export default function HistoricoTransacoes() {
    const navigation = useNavigation();
    const { historico } = useContext(TransacoesContext);
    const [filtro, setFiltro] = useState('todos');

    const historicoFiltrado = historico.filter(item =>
        filtro === 'todos' || item.tipo === filtro
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Icon name='arrow-left' size={24} color='#FFFFFF' />
                </TouchableOpacity>
                <Text style={styles.title}>Histórico de Transações</Text>
            </View>

            <View style={styles.filtrosContainer}>
                <TouchableOpacity
                    style={[styles.tipoButton, filtro === 'todos' && styles.filtroAtivo]}
                    onPress={() => setFiltro('todos')}>
                    <Text style={[styles.filtroTexto, filtro === 'todos' && [styles.filtroTextoAtivo, { color: "#00000" }]]}>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tipoButton, filtro === 'receita' && styles.receitaSelecionada]}
                    onPress={() => setFiltro('receita')}>
                    <Text style={[styles.filtroTexto, filtro === 'receita' && styles.filtroTextoAtivo]}>Receitas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tipoButton, filtro === 'despesa' && styles.despesaSelecionada]}
                    onPress={() => setFiltro('despesa')}>
                    <Text style={[styles.filtroTexto, filtro === 'despesa' && styles.filtroTextoAtivo]}>Despesas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tipoButton, filtro === 'investimento' && styles.investSelecionada]}
                    onPress={() => setFiltro('investimento')}>
                    <Text style={[styles.filtroTexto, filtro === 'investimento' && styles.filtroTextoAtivo]}>Invest</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={historicoFiltrado}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.historicoItem}>
                        <Text style={styles.historicoDescricao}>{item.descricao}</Text>
                        <Text style={[styles.historicoValor, { color: item.cor }]}>
                            {item.valor}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        padding: 20,
    },
    historicoTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    filtrosContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    filtroAtivo: {
        backgroundColor: '#FFFFFF',
    },
    filtroTexto: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    filtroTextoAtivo: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
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
    investSelecionada:{
        backgroundColor: '#3498DB',
    }
});