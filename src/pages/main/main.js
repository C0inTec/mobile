import { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { PieChart } from 'react-native-chart-kit';
import styles from './maisStyle';

import { conectionUser, conectionWallet } from '../../api/mainAPI';

// Modais || Janelas
import ModalChat from '../../components/modalChat';
import ModalPerfil from '../../components/modals/modalPerfil';

export default function Main() {
  const [eye, setEye] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [ModalPerfilVisible, setModalPerfilVisible] = useState(false);
  const [apiResponseUser, setApiResponseUser] = useState('');
  const [apiResponseWallet, setApiResponseWallet] = useState('');
  const [chartData, setChartData] = useState([]); // Estado do gráfico dinâmico

  useEffect(() => {
    const fetchData = async () => {
      const user = await conectionUser();
      const wallet = await conectionWallet();

      setApiResponseUser(user[2]);
      setApiResponseWallet(wallet[2]);

      // Gerar dados dinâmicos para o gráfico
      const totalGastos = wallet[2]?.gastos || 0;

      // Distribuição arbitrária de categorias (ajuste conforme necessário)
      const gastosData = [
        { name: 'Contas', population: totalGastos * 0.4, color: '#f39c12', legendFontColor: '#FFFFFF', legendFontSize: 10 },
        { name: 'Comida', population: totalGastos * 0.3, color: '#e74c3c', legendFontColor: '#FFFFFF', legendFontSize: 10 },
        { name: 'Lazer', population: totalGastos * 0.2, color: '#8e44ad', legendFontColor: '#FFFFFF', legendFontSize: 10 },
        { name: 'Outros', population: totalGastos * 0.1, color: '#3498db', legendFontColor: '#FFFFFF', legendFontSize: 10 },
      ];      

      setChartData(gastosData);
    };

    fetchData();
  }, []);

  const handleFabPress = () => {
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header da main */}
      <View style={styles.headerBox}>
        <View style={styles.headerDiv1}>
          <TouchableOpacity onPress={() => setModalPerfilVisible(!ModalPerfilVisible)}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
              style={{ width: 55, height: 55, borderRadius: 50 }}
            />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <TouchableOpacity onPress={() => setEye(!eye)}>
              {eye ? <Icon name="eye-off" size={26} color="white" /> : <Icon name="eye" size={26} color="white" />}
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="settings" size={26} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.headerDiv2}>
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
            Olá, {apiResponseUser?.first_name || 'Usuário'}!
          </Text>
        </View>
      </View>

      {/* Div principal */}
      <ScrollView style={styles.mainDiv} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
        <View style={styles.contentBox}>
          {/* Saldo */}
          <View style={styles.gastosComponent}>
            <View style={styles.contaRow}>
              <Text style={styles.contaText}>Saldo Atual</Text>
              <TouchableOpacity>
                <Icon name="chevron-right" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.valorText}>{eye ? `R$ ${apiResponseWallet?.saldo || '0,00'}` : 'R$ ...'}</Text>
          </View>

          {/* Gastos */}
          <View style={styles.gastosComponent}>
            <View style={styles.contaRow}>
              <Text style={styles.contaText}>Gastos no mês</Text>
              <TouchableOpacity>
                <Icon name="chevron-right" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.valorText}>{eye ? `R$ ${apiResponseWallet?.gastos || '0,00'}` : 'R$ ...'}</Text>
          </View>

          {/* Gráfico Dinâmico */}
          <View style={[styles.gastosChart, { marginTop: 20 }]}>

            <View style={styles.contaRow}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
                Distribuição de Gastos
              </Text>
              <TouchableOpacity>
                <Icon name="chevron-right" size={24} color="white" style={{ marginLeft: 10 }} />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center', marginTop: 15}}>
              <PieChart
                data={chartData}
                width={300}
                height={220}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </View>
          </View>

          {/* FAB */}
          <TouchableOpacity style={[styles.fab, { position: 'absolute', top: '60%', right: 20 }]} onPress={handleFabPress}>
            <Icon name="terminal" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modais */}
      <ModalChat modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <ModalPerfil modalVisible={ModalPerfilVisible} setModalVisible={setModalPerfilVisible} />
    </View>
  );
}