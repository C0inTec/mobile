import React, { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, ScrollView,Text, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Relatorio() {

  const navigation = useNavigation();  

  return (
    <View style={{ flex: 1, backgroundColor: "black"}}>
      <Text style={{color: 'white'}}> TESTE </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  
});