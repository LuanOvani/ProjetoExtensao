import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, ImageBackground, } from 'react-native';

export default function App() {
  const [distancia, setDistancia] = useState("");
  const [diesel, setDiesel] = useState("");
  const [media, setMedia] = useState("");
  const [diaria, setDiaria] = useState("");
  const handleCalcular = () => {
    const dist = parseFloat(distancia);
    const dieselPrice = parseFloat(diesel);
    const kmPorLitro = parseFloat(media);
    const valorDiaria = parseFloat(diaria);
  
    if (isNaN(dist) || isNaN(dieselPrice) || isNaN(kmPorLitro) || isNaN(valorDiaria)) {
      Alert.alert("Erro", "Por favor, preencha todos os campos com valores numéricos válidos");
      return;
    }
  
    const primeiroCalculo = ((dist / kmPorLitro) * dieselPrice) * 2.5;
    const diasNecessarios = Math.ceil(dist / 70);

    let segundoCalculo;
    if (diasNecessarios <= 2) {
        segundoCalculo = valorDiaria;
    } else {
        segundoCalculo = (diasNecessarios / 8) * (valorDiaria * 2);
    }

    const terceiroCalculo = primeiroCalculo + segundoCalculo;
  
    Alert.alert("Resultado", `Custo Total: R$ ${terceiroCalculo.toFixed(2)}`);
};
  return (
    <ImageBackground 
      source = {require("./src/img/bg.png")}
      resizeMode="cover"
      style={styles.container}
      >
      <StatusBar style="auto" />
      <Text>Distancia (KM):</Text>
      <TextInput keyboardType="number-pad" style={styles.input} value={distancia} onChangeText={(text) => setDistancia(text.replace(/\D/g, ""))}/>

      <Text>Preço Diesel:</Text>
      <TextInput keyboardType="number-pad" style={styles.input} value={diesel} onChangeText={(text) => setDiesel(text)}/>

      <Text>Média KM/Litro:</Text>
      <TextInput keyboardType="number-pad" style={styles.input} value={media} onChangeText={(text) => setMedia(text.replace(/\D/g, ""))}/>

      <Text>Valor diária:</Text>
      <TextInput keyboardType="number-pad" style={styles.input} value={diaria} onChangeText={(text) => setDiaria(text.replace(/\D/g, ""))}/>

      <TouchableOpacity onPress={handleCalcular} style={styles.button}>
      <Text style={styles.buttonText}>Calcular</Text>

      </TouchableOpacity>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {

    height: 54,
    width: "80%",
    backgroundColor:"#fff",
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 4,
    borderWidth: 1,
    borderColor:"#000",
  },
  button:{
    backgroundColor: "#59b280",
    width: "90%",
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText:{
  color: "#FFF",
  fontSize: 18,
  },
});

