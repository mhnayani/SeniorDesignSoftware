import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, } from 'react-native';
import Weather from './components/weather';
import sensorBox from './components/sensorBox';
import UV from './components/uv';
import RefreshBtn from './components/refreshBtn';
import AllSensors from './components/allSensors';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


export default function App() {
  let [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* <RefreshBtn /> - BROKEN, DO NOT USE UNLESS FIXED, CRASHED APP ON BUTTON PRESS. Might be an issue with the react-native-restart library */}
        <Weather />
        <sensorBox desc={"Stable"} type={"pH"} measurement={"7.81 pH"}/>
        {/*<UV />*/}
        <AllSensors />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#65a7b3',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
