import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import Sensor from './sensor';
import * as Realm from 'realm-web';

const REALM_APP_ID = "application-0-uifwd";
const app = new Realm.App({ id: REALM_APP_ID });
const REALM_API_KEY = '3nrxriTdAxhTIr9CdPtTdCir5erml3GObKGJLladTdIlexukHSOWbZ2j2XGNdhti';
const TEMP_UNITS = { Farenheight: 'degrees F', Celsius: 'degrees C' };

const AllSensors = (props) => {
  const [poolData, setPoolData] = useState({ uv: '', ph: '', orp: '', temp: '', time: '' });
  const [tempUnit, setTempUnit] = useState(TEMP_UNITS.Farenheight);
  const [timestamp, setTimestamp] = useState({ formattedTimestamp: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch the Mongo Data
    const user = await app.logIn(Realm.Credentials.apiKey(REALM_API_KEY));
    const client = app.currentUser.mongoClient('mongodb-atlas');
    const readings = client.db('SeniorDesign').collection('PrimaryCollection');

    // Fetch the UV data, read more here https://www.openuv.io/uvindex
    const uvApiUrl = "https://api.openuv.io/api/v1/uv?lat=32.9482&lng=-96.7297";
    const fetchUvData = fetch(uvApiUrl, {
      headers: {
        "x-access-token": "0bc4545928b01c6a587cc7dd522c365c"
      }
    });

    const [result, uvResponse] = await Promise.all([readings.find(), fetchUvData]);
    const uvJsonData = await uvResponse.json();

    // Set newest reading as the data to be displayed on the frontend. Newest reading is the last record in the collection.
    setPoolData({
      uv: uvJsonData.result.uv,
      orp: result[result.length - 1].orp,
      ph: result[result.length - 1].ph,
      temp: result[result.length - 1].temp,
      time: result[result.length - 1].time
    });

    // Create formatted timestamp
    const date = new Date(result[result.length - 1].time);
    setTimestamp({ formattedTimestamp: date.toLocaleString() });

    // Delete oldest records until there are at most 800 records.
    if (result.length > 800) {
      const numRecordsToDelete = result.length - 800;
      for (let i = 0; i < numRecordsToDelete; i++) {
        const deleteResult = await readings.deleteOne();
        console.log(`Deleted ${deleteResult.deletedCount} records.`);
      }
    }
  };

  const toggleTempUnit = () => {
    if (tempUnit === TEMP_UNITS.Farenheight) {
      // Convert from Farenheight to Celsius
      const temp = Math.round((poolData.temp - 32) * (5 / 9));
      setPoolData({ ...poolData, temp });
      setTempUnit(TEMP_UNITS.Celsius);
    } else {
      // Convert from Celsius to Farenheight
      const temp = Math.round(poolData.temp * (9 / 5) + 32);
      setPoolData({ ...poolData, temp });
      setTempUnit(TEMP_UNITS.Farenheight);
    }
  }

  // Calculate the status of the pool's UV
  const uvDot = (() => {
    if (poolData.uv >= 11) {
      return { color: 'purple', tooltip: 'Extremely High, Extra Protection Recommended' };
    } else if (poolData.uv >= 8 && poolData < 11) {
      return { color: 'red', tooltip: 'Very High, Extra Protection Recommended' };
    } else if (poolData.uv >= 6 && poolData && poolData < 8) {
      return { color: 'orange', tooltip: 'High, Protection Recommended' };
    } else if (poolData.uv >= 3 && poolData < 6) {
      return { color: 'yellow', tooltip: 'Medium, Protection Recommended' };
    }
    return { color: 'green', tooltip: 'No Protection' };
  })();

  // Calculate the status of the pool's temperature
  const tempDot = (() => {
    const goodTemp = { color: 'green', tooltip: 'Good temperature' };
    if (tempUnit === TEMP_UNITS.Farenheight && poolData.temp >= 78 && poolData.temp <= 82) {
      return goodTemp;
    } else if (tempUnit === TEMP_UNITS.Celsius && poolData.temp >= 26 && poolData.temp <= 28) {
      return goodTemp;
    }
    return { color: 'red', tooltip: 'Recommended temperature: 78°F to 82°F / 26°C to 28°C' };
  })();

  // Calculate the status of the pool's pH levels
  const phDot = (() => {
    if (poolData.ph >= 7.4 && poolData.ph <= 7.6) {
      return { color: 'green', tooltip: 'Good pH' };
    } else if (poolData.ph >= 7.2 && poolData.ph <= 7.8) {
      return { color: 'yellow', tooltip: 'Proper pool pH level: 7.4 to 7.8' };
    }
    return { color: 'red', tooltip: 'Proper pool pH level: 7.4 to 7.8' };
  })();

  // Calculate the status of the pool's ORP levels
  const orpDot = (() => {
    if (poolData.orp >= 650 && poolData.orp <= 750) {
      return { color: 'green', tooltip: 'Good ORP' };
    }
    return { color: 'red', tooltip: 'Recommended ORP level: 650mv to 750mv' };
  })();

  return (
    <>
      <Sensor descriptor='UV' measurement={poolData.uv} unit='UV' dotColor={uvDot.color} dotTooltip={uvDot.tooltip} />
      <Sensor onPressUnit={toggleTempUnit} descriptor='Pool Temp' measurement={poolData.temp} unit={tempUnit} dotColor={tempDot.color} dotTooltip={tempDot.tooltip} />
      <Sensor descriptor='pH' measurement={poolData.ph} unit='pH' dotColor={phDot.color} dotTooltip={phDot.tooltip} />
      <Sensor descriptor='ORP' measurement={poolData.orp} unit='mV' dotColor={orpDot.color} dotTooltip={orpDot.tooltip} />
      <Text style={styles.timestampText}>Last updated: {timestamp.formattedTimestamp}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  timestampText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: 'white',
    marginTop: 5
  },
});

export default AllSensors