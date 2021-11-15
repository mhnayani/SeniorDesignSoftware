import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=richardson,us-tx&units=imperial&appid=c8994bd806fee3ad5b68daf9cc245e95";

const Weather = (props) => {
    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
        getWeatherData();
    }, []);

    const getWeatherData = async () => {
        const response = await fetch(weatherApiUrl);
        const jsonData = await response.json();
        setWeatherData({ temp: jsonData.main.temp, feelsLike: jsonData.main.feels_like, iconCode: jsonData.weather[0].icon, main: jsonData.weather[0].main });
    };

    return (
        <View style={ styles.container }>
            <Text style = { styles.textHeader }>{ weatherData.main }</Text>
            <Image 
                source = { `http://openweathermap.org/img/wn/${weatherData.iconCode}@2x.png` }
                style = { styles.icon }
            />
            <Text style = { styles.textHeader }>{Math.round(weatherData.temp)}&deg;</Text>
            <Text style = { styles.textNonHeader }>Feels like {Math.round(weatherData.feelsLike)}&deg;</Text>
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
        fontFamily: 'montserrat',
        fontSize: 24,
        color: 'white'
    },
    textNonHeader: {
        fontFamily: 'montserrat',
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