import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [fuelBurnt, setFuelBurnt] = useState('');
  const [distance, setDistance] = useState('');
  const [fuelPer100, setFuelPer100] = useState('');
  return (
    <View style={styles.container}>
      <Text>Spalanie wyniosło {fuelPer100} litrów na 100 kilometrów.</Text>
      <TextInput placeholder='Ilość spalonego paliwa' value={fuelBurnt} onChangeText={setFuelBurnt} keyboardType='numeric' />
      <TextInput placeholder='Ilość przejechanych kilometrów' value={distance} onChangeText={setDistance} keyboardType='numeric' />
      <TouchableOpacity>
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
