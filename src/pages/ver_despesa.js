import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

function Despesa() {
  const [valor, setValor] = useState("0");
  // Estado para armazenar o valor formatado exibido no input
  const [maskedValue, setMaskedValue] = useState("R$ 0,00");
  const [descricao, setDescricao] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  // Manipulador de alteração de data
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Confirmação dos dados
  const handleConfirm = () => {
    const valorEmReais = parseFloat(valor) / 100;
    console.log("Valor salvo:", valorEmReais.toFixed(2));
    navigation.navigate("Home");
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
        <Text style={styles.title}>Nova despesa</Text>
      </View>

      {/* Seção de valor monetário */}
      <View style={styles.valorContainer}>
        <Text style={styles.labelValor}>Valor da despesa</Text>
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
            keyboardType="number-pad" // Teclado numérico


            value={valor}
            // Garante que, mesmo que maskedValue seja undefined, usaremos uma string vazia para definir a posição do cursor
            selection={{ start: (maskedValue || "").length, end: (maskedValue || "").length }}
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
          <Text style={styles.dataButtonText}>
            {date.toLocaleDateString()}
          </Text>
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
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite uma descrição"
          placeholderTextColor="#666666"
          value={descricao}
          onChangeText={setDescricao}
          maxLength={100}
        />
      </View>

      {/* Botão de confirmação */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirm}
        activeOpacity={0.8}
      >
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </TouchableOpacity>
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
});

export default Despesa;