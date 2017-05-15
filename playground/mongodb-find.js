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

  console.log('Connect to MongoDB server.');

  // db.collection('Todos').find({
  //   _id: new ObjectID('59194c3df079639aabc9f717')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // })

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos Count = ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // })

  db.collection('Users').find({name: 'Mike'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos:', err);
  })

  db.close();
});
