// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb'); // ES6 Feature: Object destructuring

/* Example: We can use ObjectID to generate unique ID values
   let obj = new ObjectID();
   console.log(obj);
*/

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }

  console.log('Connect to MongoDB server.');

  // https://docs.mongodb.com/manual/reference/operator/update/

  // db.collection('Todos').findOneAndUpdate({
  //   _id: ObjectId("59196c4bf079639aabc9fa28")
  // }, {
  // $set: {complete: false}
  // }, {
  //   returnOriginal: false
  // })
  // .then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').findOneAndUpdate({
    _id: ObjectId("59195025f079639aabc9f778")
  }, {
    $set: {name: 'James'},
    $inc: {age: 1}
  }, {returnOriginal: false}).then((result) => {
    console.log(result);
  });

  db.close();
});
