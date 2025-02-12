// components/Header.js
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import styles from "./headerStyle.js";

export default function Header({ eye, setEye, apiResponseUser, setModalPerfilVisible, ModalPerfilVisible }) {
  return (
    <View style={styles.headerBox}>
      <View style={styles.headerDiv1}>
        <TouchableOpacity onPress={() => setModalPerfilVisible(!ModalPerfilVisible)}>
          <Image source={{ uri: "https://randomuser.me/api/portraits/men/41.jpg" }} style={{ width: 55, height: 55, borderRadius: 50 }} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <TouchableOpacity onPress={() => setEye(!eye)}>
            <Icon name={eye ? "eye-off" : "eye"} size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="settings" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerDiv2}>
        <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
          Olá, {apiResponseUser?.first_name || "Usuário"}!
        </Text>
      </View>
    </View>
  );
}