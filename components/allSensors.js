import { post } from 'jquery';
import React, { useState, useEffect } from 'react';
import Sensor from './sensor';
import { MongoClient, ServerApiVersion } from 'mongodb';

{/* https://www.openuv.io/uvindex */}
const mongoApiUrl = "https://data.mongodb-api.com/app/data-uakhq/endpoint/data/beta/action/findOne";

const AllSensors = (props) => {
    const [mongoData, setMongoData] = useState({});

    useEffect(() => {
        {/*getMongoData();*/}
    }, []);

    {/*const getMongoData = async() => {
        const response = await fetch(mongoApiUrl, {
          method: 'POST',
          headers: {
            'api-key': 'gFk33WCYCSmna4gvmVQxvWbMP3de0Fr3HT6QUCbq6sesTgVx9oSmq13HMKcvsA73',
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
          },
          body: JSON.stringify({
            dataSource: 'Cluster1',
            database: 'SeniorDesign',
            collection: 'PrimaryCollection',
            sort: { '_id': -1 },
            limit: 1
          })
        });
        const jsonData = await response.json();
        console.log(jsonData);
        console.log(jsonData.result.uv);
        
    };*/}
    {/*const getMongoData = async() => {
        const uri = 'mongodb+srv://admin:UTDBaseball16!@cluster1.2dnnp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        try {
            await client.connect();
            const collection = client.db('SeniorDesign').collection('PrimaryCollection');
            const query = {};
            const options = {
              sort: { '_id': -1 },
              limit: 1,
            };
            const reading = await collection.findOne(query, options);
            console.log(reading);
          } finally {
            await client.close();
          }
    }*/}

    return (
        <>
            <Sensor descriptor='pH' measurement='7.2' unit='pH'/>
            <Sensor descriptor='ORP' measurement='720' unit='mV'/>
            <Sensor descriptor='Pool Temp' measurement='72' unit='degrees F'/>
        </>
    );
}

export default AllSensors