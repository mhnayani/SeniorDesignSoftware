import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const Sensor = (props) => {
   const unitText = <Text style = {styles.sideText}>{props.unit}</Text>;
   return (
      <View style = {styles.container}>
            <Text style = {styles.sideText}>{props.descriptor}</Text>
            <Text style = {styles.middleText}>{props.measurement}</Text>
            {props.onPressUnit ? <TouchableOpacity onPress={props.onPressUnit}>{unitText}</TouchableOpacity> : unitText}
      </View>
   )
}

const styles = StyleSheet.create ({
   container: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: 'white'
   },
   sideText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: 'white',
   },
   middleText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 24,
        color: 'white',
   },
});

export default Sensor