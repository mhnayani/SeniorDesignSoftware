import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

{/* https://openweathermap.org/current */}
const weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=richardson,us-tx&units=imperial&appid=c8994bd806fee3ad5b68daf9cc245e95";
{/* https://www.openuv.io/uvindex */}
const uvApiUrl = "https://api.openuv.io/api/v1/uv?lat=32.9482&lng=-96.7297";

export default function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [uvData, setUvData] = useState({});
  const [sensorData, setSensorData] = useState({});

  useEffect(() => {
    getWeatherData();
  }, []);

  useEffect(() => {
    getWeatherData();
  }, []);

  useEffect(() => {
    getWeatherData();
  }, []);

  const getWeatherData = async () => {
    const response = await fetch(weatherApiUrl);
    const jsonData = await response.json();
    console.log(jsonData);
    setWeatherData(jsonData);
  };

  {/*const getUvData = async() => {
    const response = await fetch(uvApiUrl, {
      headers: {
        "x-access-token": "0bc4545928b01c6a587cc7dd522c365c"
      }
    });
    const jsonData = await response.json();
    setUvData(jsonData);
  };*/}

  {/*const getSensorData = async () => {
    const response = await fetch(weatherApiUrl);
    const jsonData = await response.json();
    console.log(jsonData);
    setWeatherData(jsonData);
  };*/}

  return (
    <View style={styles.container}>
      <Text>TESTING WEATHER API - Current Temp: {Object.keys(weatherData).map((main) => (
        <Text>{weatherData[main].temp}</Text>
      ))} degrees Farenheit</Text>
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
