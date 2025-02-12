import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import styles from "./despesaStyle";

function Despesa() {
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
        <Text style={styles.title}>Nova Despesa</Text>
      </View>

      <View style={styles.valorContainer}>
        <Text style={styles.labelValor}>Valor da Despesa</Text>
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

export default Despesa;
