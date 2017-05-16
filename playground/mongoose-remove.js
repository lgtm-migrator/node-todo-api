var {ObjectID} = require('mongodb');

var {mongoose} = require('../server/db/mongoose');
var {Todo} = require('../server/models/todo');
var {User} = require('../server/models/user');

// Todo.remove({})

Todo.findOneAndRemove("591a954d65ab9d450cc0038f").then((todo) => {
  console.log(todo);
});

// Todo.findByIdAndRemove("591a954d65ab9d450cc00390").then((todo) => {
//   console.log(todo);
// })
