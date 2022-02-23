import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Returns the current time in AM and PM format
const currentDate = new Date();
const formatTime = () => {
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

// Returns the current date as MM, DD format
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const formatDate = () => {
    const month = MONTHS[currentDate.getMonth()];
    return `${month} ${currentDate.getDay()}`;
}

const DateTime = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.timeText}>{formatTime()}</Text>
            <Text style={styles.dateText}>{formatDate()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    dateText: {
        marginTop: 4,
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        textAlign: 'center',
        color: 'gainsboro',
    },
});

export default DateTime;
