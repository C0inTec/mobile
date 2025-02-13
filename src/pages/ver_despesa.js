import React, { useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Feather";

import { TransacoesContext } from '../../contexts/TransacoesContext';
import SecondaryHeader from "../components/header/secondaryHeader";

export default function Despesa() {

    const navigation = useNavigation();


    return (
        <View style={{ flex: 1 }}>

            <SecondaryHeader title={"Despesas"} />

        </View>
    );
}

const styles = StyleSheet.create({
    homeDiv: {
        backgroundColor: '#0A0A0A',
        minHeight: '100%',
        width: '100%',
        height: '100%',
    },
    contentBox: {
        backgroundColor: '#0A0A0A',
        width: '90%',
        height: '100%',
        alignSelf: 'center',
    }
});