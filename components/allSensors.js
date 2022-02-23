import React, { useState, useEffect } from 'react';
import Sensor from './sensor';
import * as Realm from 'realm-web';

const REALM_APP_ID = "application-0-uifwd";
const app = new Realm.App({ id: REALM_APP_ID });

const AllSensors = (props) => {
    const [mongoData, setMongoData] = useState({});

    useEffect(() => {
        getMongoData();
    }, []);
    const getMongoData = async() => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      const client = app.currentUser.mongoClient('mongodb-atlas');
      const readings = client.db('SeniorDesign').collection('PrimaryCollection');
      const result = await readings.find();
      console.log('All readings...');
      console.log(result);
      console.log('Newest reading...');
      console.log(result[result.length - 1]);
      setMongoData({ orp: result[result.length - 1].orp, ph: result[result.length - 1].ph, temp: result[result.length - 1].temp, timestamp: result[result.length - 1].time });
    };


    return (
        <>
            <Sensor descriptor='Pool Temp' measurement={mongoData.temp} unit='&deg;C'/>
            <Sensor descriptor='pH Level' measurement={mongoData.ph} unit='pH'/>
            <Sensor descriptor='ORP Level' measurement={mongoData.orp} unit='mV'/>
        </>
    );
}

export default AllSensors