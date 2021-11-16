import { Pressable, View, StyleSheet, Image } from 'react-native';
import React from 'react';
import { RNRestart } from 'react-native-restart';
import icon from '../assets/refresh_btn';

const RefreshBtn = () => {

    const startReload = () => RNRestart.Restart();

    return(
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={startReload}>
                <Image 
                    source = {icon.refresh}
                    style = {styles.icon}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: '80%',
        marginTop: '15%'
    },
    button: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      borderRadius: 4,
    },
    icon: {
        height: 20,
        width: 20,
        resizeMode: 'stretch'
    }
  });

export default RefreshBtn