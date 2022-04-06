import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import Sensor from './sensor';
import * as Realm from 'realm-web';

const REALM_APP_ID = "application-0-uifwd";
const app = new Realm.App({ id: REALM_APP_ID });
const REALM_API_KEY = '3nrxriTdAxhTIr9CdPtTdCir5erml3GObKGJLladTdIlexukHSOWbZ2j2XGNdhti';
const TEMP_UNITS = { Farenheight: 'degrees F', Celsius: 'degrees C' };

const AllSensors = (props) => {
    const [mongoData, setMongoData] = useState({ ph: '', orp: '', temp: '', time: '' });
    const [tempUnit, setTempUnit] = useState(TEMP_UNITS.Celsius);
    const [timestamp, setTimestamp] = useState({ formattedTimestamp: ''});

    useEffect(() => {
        getMongoData();
    }, []);

    const getMongoData = async() => {
      const user = await app.logIn(Realm.Credentials.apiKey(REALM_API_KEY));
      const client = app.currentUser.mongoClient('mongodb-atlas');
      const readings = client.db('SeniorDesign').collection('PrimaryCollection');
      const result = await readings.find();

      // Set newest reading as the data to be displayed on the frontend. Newest reading is the last record in the collection.
      setMongoData({ orp: result[result.length - 1].orp, ph: result[result.length - 1].ph, temp: result[result.length - 1].temp, time: result[result.length - 1].time });
      
      // Create formatted timestamp
      const date = new Date(result[result.length - 1].time);
      setTimestamp({ formattedTimestamp: date.toLocaleString() });

      // Delete oldest records until there are at most 800 records.
      if(result.length > 800) {
        const numRecordsToDelete = result.length - 800;
        for(let i = 0; i < numRecordsToDelete; i++){
            const deleteResult = await readings.deleteOne();
            console.log(`Deleted ${deleteResult.deletedCount} records.`);
        }
      }
    };

    const toggleTempUnit = () => {
      if (tempUnit === TEMP_UNITS.Farenheight) {
        // Convert from Farenheight to Celsius
        const temp = Math.round((mongoData.temp - 32) * (5 / 9));
        setMongoData({ ...mongoData, temp });
        setTempUnit(TEMP_UNITS.Celsius);
      } else {
        // Convert from Celsius to Farenheight
        const temp = Math.round(mongoData.temp * (9 / 5) + 32);
        setMongoData({ ...mongoData, temp });
        setTempUnit(TEMP_UNITS.Farenheight);
      }
    }

    return (
        <>
          <Button onPress={getMongoData} title="Refresh"/>
          <Sensor onPressUnit={toggleTempUnit} descriptor='Pool Temp' measurement={mongoData.temp} unit={tempUnit}/>
          <Sensor descriptor='pH' measurement={mongoData.ph} unit='pH'/>
          <Sensor descriptor='ORP' measurement={mongoData.orp} unit='mV'/>
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