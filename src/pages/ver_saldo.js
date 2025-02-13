// ver_saldo.js
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { TransacoesContext } from "../../contexts/TransacoesContext";

function Saldo() {
  const { saldo, historico, adicionarTransacao } = useContext(TransacoesContext);
  const [valor, setValor] = useState("0");
  const [maskedValue, setMaskedValue] = useState("R$ 0,00");
  const [descricao, setDescricao] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tipoTransacao, setTipoTransacao] = useState("receita");
  const navigation = useNavigation();

  const formatarMoeda = (valor) => {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
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

  const handleConfirm = () => {
    if (isConfirmButtonEnabled()) {
      const valorNumerico = parseFloat(valor) / 100;

      const novaTransacao = {
        id: Date.now().toString(),
        descricao: descricao.slice(0, 30),
        valor: `${tipoTransacao === "receita" ? "+" : "-"} ${formatarMoeda(valorNumerico)}`,
        cor: tipoTransacao === "receita" ? "#00FF00" : "#FF0000",
        tipo: tipoTransacao,
      };

      adicionarTransacao(novaTransacao, valorNumerico);

      setDescricao("");
      setValor("0");
      setMaskedValue("R$ 0,00");
    }
  };

  const isConfirmButtonEnabled = () => {
    return parseFloat(valor) > 0 && descricao.trim() !== "";
  };

  return (
    <View style={styles.container}>
      {/* Header da tela */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Nova transação</Text>
      </View>

      {/* Botões de Receita/Despesa */}
      <View style={styles.tipoContainer}>
        <TouchableOpacity
          style={[
            styles.tipoButton,
            tipoTransacao === "receita" && styles.receitaSelecionada,
          ]}
          onPress={() => setTipoTransacao("receita")}
        >
          <Text style={styles.tipoButtonText}>Receita</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tipoButton,
            tipoTransacao === "despesa" && styles.despesaSelecionada,
          ]}
          onPress={() => setTipoTransacao("despesa")}
        >
          <Text style={styles.tipoButtonText}>Despesa</Text>
        </TouchableOpacity>
      </View>

      {/* Seção de valor monetário */}
      <View style={styles.valorContainer}>
        <Text style={styles.labelValor}>Valor da transação</Text>
        <View style={styles.inputRow}>
          <MaskedTextInput
            type="currency"
            options={{
              prefix: "R$ ",
              decimalSeparator: ",",
              groupSeparator: ".",
              precision: 2,
            }}
            style={styles.inputValor}
            keyboardType="number-pad"
            value={valor}
            selection={{
              start: (maskedValue || "").length,
              end: (maskedValue || "").length,
            }}
            onChangeText={(formatted, rawText) => {
              setValor(rawText || "0");
              setMaskedValue(formatted);
            }}
            placeholder="00,00"
            placeholderTextColor="#FFFFFF"
          />
        </View>
      </View>

      {/* Seção de seleção de data */}
      <View style={styles.dataSection}>
        <TouchableOpacity
          style={styles.dataButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dataButtonText}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>

      {/* DatePicker condicional */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
          textColor="#000000"
          themeVariant="light"
        />
      )}

      {/* Campo de descrição */}
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

      {/* Exibição do saldo */}
      <View style={styles.saldoContainer}>
        <Text style={styles.saldoLabel}>Saldo em Contas:</Text>
        <Text
          style={[
            styles.saldoValor,
            { color: saldo >= 0 ? "#00FF00" : "#FF0000" },
          ]}
        >
          {formatarMoeda(saldo)}
        </Text>
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

      {/* Histórico de Transações */}
      <Text style={styles.historicoTitle}>Histórico de Transações</Text>
      <FlatList
        data={historico}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historicoItem}>
            <Text style={styles.historicoDescricao}>{item.descricao}</Text>
            <Text style={[styles.historicoValor, { color: item.cor }]}>
              {item.valor}
            </Text>
          </View>
        )}
        style={styles.historicoList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    marginLeft: 15,
  },
  valorContainer: {
    marginBottom: 30,
  },
  labelValor: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputValor: {
    color: "#FFFFFF",
    fontSize: 30,
    flex: 1,
    paddingVertical: 8,
  },
  dataSection: {
    flexDirection: "row",
    marginBottom: 30,
  },
  dataButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  dataButtonText: {
    color: "#000000",
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    color: "#FFFFFF",
    paddingVertical: 10,
  },
  confirmButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  historicoTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  historicoList: {
    flex: 1,
  },
  historicoItem: {
    flexDirection: "column",
    justifyContent: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  historicoDescricao: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 5,
  },
  historicoValor: {
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmButtonDisabled: {
    backgroundColor: "#A9A9A9",
    opacity: 0.5,
  },
  tipoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tipoButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#333333",
  },
  receitaSelecionada: {
    backgroundColor: "#00FF00",
  },
  despesaSelecionada: {
    backgroundColor: "#FF0000",
  },
  tipoButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  saldoContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  saldoLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 5,
  },
  saldoValor: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Saldo;