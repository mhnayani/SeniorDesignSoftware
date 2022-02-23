import React, { useState, useEffect } from 'react';
import Sensor from './sensor';
import * as Realm from 'realm-web';

const REALM_APP_ID = "application-0-uifwd";
const app = new Realm.App({ id: REALM_APP_ID });
const TEMP_UNITS = { Farenheight: 'degrees F', Celsius: 'degrees C' };

const AllSensors = (props) => {
    const [mongoData, setMongoData] = useState({ ph: '', orp: '', temp: '' });
    const [tempUnit, setTempUnit] = useState(TEMP_UNITS.Farenheight);

    useEffect(() => {
        getMongoData();
    }, []);

    const getMongoData = async() => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      const client = app.currentUser.mongoClient('mongodb-atlas');

      // Use the first reading of the pool sensor as the data to display on the front-end
      const readings = client.db('SeniorDesign').collection('PrimaryCollection');
      const [result] = await readings.find();
      setMongoData(result);
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
            <Sensor descriptor='pH' measurement={mongoData.ph} unit='pH'/>
            <Sensor descriptor='ORP' measurement={mongoData.orp} unit='mV'/>
            <Sensor onPressUnit={toggleTempUnit} descriptor='Pool Temp' measurement={mongoData.temp} unit={tempUnit}/>
        </>
    );
}

export default AllSensors