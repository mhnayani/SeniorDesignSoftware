import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

{/* https://www.openuv.io/uvindex */}
const uvApiUrl = "https://api.openuv.io/api/v1/uv?lat=32.9482&lng=-96.7297";

const UV = (props) => {
    const [uvData, setUvData] = useState([]);

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
        setUvData(jsonData);
    };

    return (
        <Text>TESTING UV API - Current UV: {Object.keys(uvData).map((result) => (<Text>{uvData[result].uv}</Text>))}</Text>
    );
}

export default UV