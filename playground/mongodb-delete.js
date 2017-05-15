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

  // deleteMany
  // db.collection('Todos').deleteMany({text:'Eat Dinner'}).then((res) => {
  //   console.log(res);
  // }, (err) => {
  //   console.log('Failed to deleteMany:',err);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat Dinner'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Failed to deleteOne', err);
  // })

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({complete: false}).then((result) => {
  //   console.log(result);
  // })

  // db.collection('Users').deleteMany({name: 'Mike'}).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').findOneAndDelete({
    _id: ObjectID('59194364f379f72ce87663c0')
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2);
  })

  // db.close();
});
