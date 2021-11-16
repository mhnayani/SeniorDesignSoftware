import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

{/* https://www.openuv.io/uvindex */}
const uvApiUrl = "https://api.openuv.io/api/v1/uv?lat=32.9482&lng=-96.7297";

const UV = (props) => {
    const [uvData, setUvData] = useState({});

    useEffect(() => {
        getUvData();
    }, []);

    const getUvData = async() => {
        const response = await fetch(uvApiUrl, {
          headers: {
            "x-access-token": "0bc4545928b01c6a587cc7dd522c365c"
          }
        });
        const jsonData = await response.json();
        console.log(jsonData);
        console.log(jsonData.result.uv);
        setUvData({ uv: jsonData.result.uv });
    };

    return (
        <View>
          <Text style={styles.textHeader}>UV: {uvData.uv}</Text>
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

export default UV