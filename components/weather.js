import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather?q=richardson,us-tx&units=imperial&appid=c8994bd806fee3ad5b68daf9cc245e95";

const Weather = (props) => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        getWeatherData();
    }, []);

    const getWeatherData = async () => {
        const response = await fetch(weatherApiUrl);
        const jsonData = await response.json();
        console.log(jsonData);
        setWeatherData(jsonData);
    };

    return (
        <Text>TESTING WEATHER API - Current Temp: {Object.keys(weatherData).map((main) => (
            <Text>{weatherData[main].temp}</Text>
        ))} degrees Farenheit</Text>
    );
}

export default Weather