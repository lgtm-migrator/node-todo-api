// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // ES6 Feature: Object destructuring

/* Example: We can use ObjectID to generate unique ID values
   let obj = new ObjectID();
   console.log(obj);
*/

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }

  console.log('Connect to MongoDB server.')

  // db.collection('Todos').insertOne({
  //   text: 'Some text here',
  //   complete: false
  // }, (err, res) => {
  //   if (err) {
  //     return console.log('Unable to insert:', err);
  //   }
  //
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  //
  // });
  //
  // // Insert new doc (name, age, location) into Users
  // db.collection('Users').insertOne({
  //   name: 'John Smith',
  //   age: 21,
  //   location: 'Singapore'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert document:', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  db.close();
});
