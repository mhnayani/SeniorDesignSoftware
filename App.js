import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Weather from './components/weather';
import UV from './components/uv';
import RefreshBtn from './components/refreshBtn';

export default function App() {

  {/*const getUvData = async() => {
    const response = await fetch(uvApiUrl, {
      headers: {
        "x-access-token": "0bc4545928b01c6a587cc7dd522c365c"
      }
    });
    const jsonData = await response.json();
    setUvData(jsonData);
  };*/}

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <RefreshBtn />
      <Weather />
      {/*<UV />*/}
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
  }
});
