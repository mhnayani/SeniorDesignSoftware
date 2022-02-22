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
      console.log(result);
    };


    return (
        <>
            <Sensor descriptor='pH' measurement='7.2' unit='pH'/>
            <Sensor descriptor='ORP' measurement='720' unit='mV'/>
            <Sensor descriptor='Pool Temp' measurement='72' unit='degrees F'/>
        </>
    );
}

export default AllSensors