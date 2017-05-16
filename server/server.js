// REST API: https://www.getpostman.com/

var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());

app.post('/todos', (request, response) => {
  var todo = new Todo({
    text: request.body.text
  });

  todo.save().then((doc) => {
    response.send(doc);
  }, (e) => {
    response.status(400).send(e);
  })
});

app.get('/todos', (request, response) => {
  Todo.find().then((todos) => {
    response.send({todos}) // sending back as object for more flexibility
  }, (e) => {
    response.status(400).send(e);
  })
})

// GET /todos/1234...

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  //Check if the id is valid
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // Find in the database and attempt to send back
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo}); // send as object for flexibility
  }).catch((e) => {
    res.status(400).send();
    // Don't send the error (which may contain private info)
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  // Validate id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // Find document and attempt to delete it
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});

  }).catch((e) => {
    res.status(400).send();
  });
})

app.listen(port, () => {
  console.log(`Listen to port ${port}`);
});

module.exports = {app};
