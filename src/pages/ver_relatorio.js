import React from 'react';
import { View,Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Relatorio() {

  const navigation = useNavigation();  

  return (
    <View style={{ flex: 1, backgroundColor: '#000000'}}>
      <Text style={{color: '#FFFFFF'}}> TESTE </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  
});