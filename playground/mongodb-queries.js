var {ObjectID} = require('mongodb');
var {mongoose} = require('../server/db/mongoose');
var {Todo} = require('../server/models/todo');
var {User} = require('../server/models/user');

var todo_id = "591a5ab8f189572b84524ab6";
var user_id = "59198d963083c3712427b85f";

User.findById(user_id).then((user) => {
  if (!user) {
    return console.log('Unable to find user');
  }
  console.log('Found user', user);
}).catch((e) => console.log(e));

// if (!ObjectID.isValid(todo_id)) {
//   return console.log('ID is not valid');
// }
//
// Todo.find({
//   _id: todo_id
// }).then((todos) => {
//   console.log('Using find()', todos);
// });
//
// Todo.findOne({_id: todo_id}).then((todo) => {
//   console.log('Using findOne()', todo);
// });
//
// Todo.findById(todo_id).then((todo) => {
//   if (!todo) {
//     return console.log('cannot find the todo_id');
//   }
//
//   console.log('Using findById', todo);
// }).catch((e) => console.log(e));
