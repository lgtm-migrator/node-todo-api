var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {type: String, required: true, minlength: 1, trim: true},
  completed: {type: Boolean, default: false},
  completedAt: {type: Number, default: null},
  _creator: {type: mongoose.Schema.Types.ObjectId, required: true}
});

// var newTask = new Todo({
//   text: 'Walk the dog',
//   completed: true,
//   completedAt: 1494871200
// });

// newTask.save().then((result) => {
//   console.log('Saved task', result);
// }, (e) => {
//   console.log('Unable to save task', e);
// });

module.exports = {Todo};
