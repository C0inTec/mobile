import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

function Receita() {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleConfirm = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Nova receita</Text>
      </View>

      <View style={styles.valorContainer}>
        <Text style={styles.labelValor}>Valor da receita</Text>
        <View style={styles.inputRow}>
          <Text style={styles.currency}>R$</Text>
          <TextInput
            style={styles.inputValor}
            placeholder="0,00"
            placeholderTextColor="#fff"
            keyboardType="numeric"
            value={valor}
            onChangeText={setValor}
          />
          <Text style={styles.moeda}>BRL</Text>
        </View>
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
          mode="date"
          display="default"
          onChange={handleDateChange}
          textColor="#000000"
          themeVariant="light"
        />
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite uma descrição"
          placeholderTextColor="#666"
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 15,
  },
  valorContainer: {
    marginBottom: 30,
  },
  labelValor: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  currency: {
    color: "#fff",
    fontSize: 30,
    marginRight: 5,
  },
  inputValor: {
    color: "#fff",
    fontSize: 30,
    flex: 1,
  },
  moeda: {
    color: "#666",
    fontSize: 16,
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
  dataButtonInactive: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  dataButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  dataButtonTextInactive: {
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    color: "#fff",
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
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Receita;
