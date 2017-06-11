// REST API: https://www.getpostman.com/
var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
require('./config/config');

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
const bcrypt = require('bcryptjs');

const port = process.env.PORT;

var app = express();
app.use(bodyParser.json());

app.post('/users', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch(e) {
    res.status(400).send(e);
  };
})

app.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredential(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// Private route
app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  };
})

// We add authentication to set route to private
app.post('/todos', authenticate, async (req, res) => {
  try {
    var todo = new Todo({
      text: req.body.text,
      _creator: req.user._id
    });
    const doc = await todo.save();
    res.send(doc);
  } catch (e) {
      res.status(400).send(e);
  }
});

app.get('/todos', authenticate, async (req, res) => {
  try {
    const todos = await Todo.find({
      _creator: req.user._id
    });
    res.send({todos}) // sending back as object for more flexibility
  } catch (e) {
    res.status(400).send(e);
  };
});

app.get('/todos/:id', authenticate, async (req, res) => {
  try {
    var id = req.params.id;
    var user_id = req.user._id;

    //Check if the id is valid
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    };

    const todo = await Todo.findOne({
      _id: id,
      _creator: user_id
    });

    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo}); // send as object for flexibility
  } catch (e) {
    // Don't send the error (which may contain private info)
    res.status(400).send();
  };
});

app.delete('/todos/:id', authenticate, async (req, res) => {
  try {
    var id = req.params.id;
    var user_id = req.user._id;

    // Validate id
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    // Find document and attempt to delete it
    const todo = await Todo.findOneAndRemove({
      _id: id,
      _creator: user_id
    });

    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  } catch (e) {
    res.status(400).send();
  };
});

app.patch('/todos/:id', authenticate, async (req, res) => {
  try {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    // Validate id
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    }
    else {
      body.completedAt = null;
      body.completed = false;
    }

    const todo = await Todo.findOneAndUpdate({
      _id: id,
      _creator: req.user._id
    }, {$set: body}, {new : true});

    if (!todo) {
      res.status(404).send();
    }
    res.send({todo});

  } catch (e) {
    res.status(400).send()
  }
});

app.listen(port, () => {
  console.log(`Listen to port ${port}`);
});

module.exports = {app};
