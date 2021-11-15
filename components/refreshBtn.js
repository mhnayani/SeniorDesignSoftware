import { Pressable, View, StyleSheet, Image } from 'react-native';
import React from 'react';

const RefreshBtn = () => {

    const startReload = () => {
        window.location.reload(false);
    };

    return(
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={startReload}>
                <Image 
                    source = 'https://icon-library.com/images/refresh-icon-white/refresh-icon-white-1.jpg'
                    style = {styles.icon}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: '95%',
        marginTop: '2%'
    },
    button: {
      alignItems: 'right',
      justifyContent: 'right',
      paddingVertical: 3,
      paddingHorizontal: 3,
      borderRadius: 4,
    },
    icon: {
        height: 20,
        width: 20,
        resizeMode: 'stretch'
    }
  });

export default RefreshBtn