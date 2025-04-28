import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function App() {
  const [fuelBurnt, setFuelBurnt] = useState('');
  const [distance, setDistance] = useState('');
  const [fuelPer100, setFuelPer100] = useState('');

  const calculateFuelPer100 = () => {
    if (fuelBurnt === '' || distance === '') {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola');
      return;
    }
    const fuel = parseFloat(fuelBurnt);
    const dist = parseFloat(distance);
    if (isNaN(fuel) || isNaN(dist) || dist <= 0) {
      Alert.alert('Błąd', 'Podaj poprawne wartości');
      return;
    }
    const result = (fuel / dist) * 100;
    setFuelPer100(result.toFixed(2));
    setFuelBurnt('');
    setDistance('');
    addToDatabase();
  }

  const addToDatabase = async () => {
    try {
      await addDoc(collection(db, 'fuelCalculations'), {
        fuelBurnt: parseFloat(fuelBurnt),
        distance: parseFloat(distance),
        fuelPer100: fuelPer100
      });
      Alert.alert('Sukces', 'Dane zostały dodane do bazy danych');
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się dodać danych do bazy danych');
    }
  }
  return (
    <View style={styles.container}>
      <Text>Spalanie wyniosło {fuelPer100} litrów na 100 kilometrów.</Text>
      <TextInput placeholder='Ilość spalonego paliwa' value={fuelBurnt} onChangeText={setFuelBurnt} keyboardType='numeric' />
      <TextInput placeholder='Ilość przejechanych kilometrów' value={distance} onChangeText={setDistance} keyboardType='numeric' />
      <TouchableOpacity onPress={calculateFuelPer100}>
        <Text>Oblicz</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
