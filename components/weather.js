import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import images from '../assets/weather';

const weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=richardson,us-tx&units=imperial&appid=c8994bd806fee3ad5b68daf9cc245e95";
const TEMP_UNITS = { Farenheight: 'F', Celsius: 'C' };

const Weather = (props) => {
    const [weatherData, setWeatherData] = useState({});
    const [tempUnit, setTempUnit] = useState(TEMP_UNITS.Farenheight);

    useEffect(() => {
        getWeatherData();
    }, []);

    const getWeatherData = async () => {
        const response = await fetch(weatherApiUrl);
        const jsonData = await response.json();
        setWeatherData({ temp: jsonData.main.temp, feelsLike: jsonData.main.feels_like, iconCode: jsonData.weather[0].icon, main: jsonData.weather[0].main });
    };

    const toggleTempUnit = () => {
        if (tempUnit === TEMP_UNITS.Farenheight) {
          // Convert from Farenheight to Celsius
          const temp = Math.round((weatherData.temp - 32) * (5 / 9));
          const feelsLike = Math.round((weatherData.feelsLike - 32) * (5 / 9));
          setWeatherData({ ...weatherData, temp, feelsLike });
          setTempUnit(TEMP_UNITS.Celsius);
        } else {
          // Convert from Celsius to Farenheight
          const temp = Math.round(weatherData.temp * (9 / 5) + 32);
          const feelsLike = Math.round(weatherData.feelsLike * (9 / 5) + 32);
          setWeatherData({ ...weatherData, temp, feelsLike });
          setTempUnit(TEMP_UNITS.Farenheight);
        }
      }

    return (
        <View style={ styles.container }>
            <Text style = { styles.textHeader }>{ weatherData.main }</Text>
            <Image 
                source = { images[weatherData.iconCode] }
                style = { styles.icon }
            />
            <TouchableOpacity onPress={toggleTempUnit}>
                <Text style = { styles.textHeader }>{Math.round(weatherData.temp)} &deg;{tempUnit}</Text>
                <Text style = { styles.textNonHeader }>Feels like {Math.round(weatherData.feelsLike)} &deg;{tempUnit}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textHeader: {
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center',
        fontSize: 24,
        color: 'white'
    },
    textNonHeader: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: 'white'
    },
    icon: {
        height: 100,
        width: 100,
        resizeMode: 'stretch'
    }
  });

export default Weather