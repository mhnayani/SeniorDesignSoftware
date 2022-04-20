import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as encoding from 'text-encoding';
import { StyleSheet, SafeAreaView, } from 'react-native';
import Weather from './components/weather';
import AllSensors from './components/allSensors';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import DateTime from './components/dateTime';


export default function App() {
  let [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        {/* <RefreshBtn /> - BROKEN, DO NOT USE UNLESS FIXED, CRASHED APP ON BUTTON PRESS. Might be an issue with the react-native-restart library */}
        <Weather />
        <AllSensors />
        <DateTime />
      </SafeAreaView>
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