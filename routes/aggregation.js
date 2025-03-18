// const { MongoClient } = require('mongodb');
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);
// const logger=require('../routes/logger/loggers.js');

// async function addData(json, collectionName) {
//   try {
//     await client.connect();
//     const database = client.db('aggregate');
//     const collection = database.collection(collectionName);
//     await collection.insertMany(json);
//     logger.info('data addded');
//   } catch (error) {
//     logger.error(`error --->${error.toString()}`)
//   }
// }

// addData([ 
//   { "_id": 18, "name": "Amit Patel", "salary": 50000, "bonus": 5000 },
//   { "_id": 19, "name": "Priya Sharma", "salary": 40000, "bonus": 3000 },
//   { "_id": 20, "name": "Rahul Mehta", "salary": 60000, "bonus": 7000 }, 
// ]

//   , 'update_date'
// );

const error=Error('this is first error');
console.log('error ',error)