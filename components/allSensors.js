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

      // Get newest reading and set the state to the appropriate values.
      const result = await readings.find();
      console.log('All readings...');
      console.log(result);
      console.log('Newest reading...');
      console.log(result[result.length - 1]);
      setMongoData({ orp: result[result.length - 1].orp, ph: result[result.length - 1].ph, temp: result[result.length - 1].temp, timestamp: result[result.length - 1].time });

      // Delete oldest records until there are at most 800 records.
      if(result.length > 800) {
        const numRecordsToDelete = result.length - 800;
        for(let i = 0; i < numRecordsToDelete; i++){
            const deleteResult = await readings.deleteOne();
            console.log(`Deleted ${deleteResult.deletedCount} records.`);
        }
      }
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