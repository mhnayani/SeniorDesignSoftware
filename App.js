import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

{/* https://openweathermap.org/current */}
const weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=richardson,tx&appid=c8994bd806fee3ad5b68daf9cc245e95";

export default function App() {

  const getWeatherData = async () => {
    const response = await fetch(weatherApiUrl);
    const jsonData = await response.json();
    setUserData(jsonData);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button>{/* Put a right-aligned refresh button here? */}</Button>
      <Text> {/* Put center-aligned word for current weather here (e.g. Clear, Raining, etc..) */} </Text>
      {/* Put weather image here based on what the weather is. */}
      {/* Put weather data and image here */}
      {/* Put sensor data box components in here.*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#65a7b3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {

  },
  weatherText: {

  }
});
