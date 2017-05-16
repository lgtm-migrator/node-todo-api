const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

// https://www.npmjs.com/package/supertest
//https://github.com/mjackson/expect

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: "First text"},
  {
    _id: new ObjectID(), //For testing PATCH
    text: "Second text",
    completed: true,
    completedAt: 18888}
  ]; // dummy values

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done()); // empty db
});

describe('POST/todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should not create a new todo with invalid data', (done) => {
    var text = "";
    request(app)
    .post('/todos')
    .send({text})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2); // expect db to be only two docs (added)
        done();
      }).catch((e) => done(e));
    });
  });

});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2); // custom expect
    })
    .end(done);
  })
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found in db', (done) => {
    var id = new ObjectID();
    request(app)
    .get(`/todos/${id.toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 if id is invalid', (done) => {
    var invalid_id = "12345";
    request(app)
    .get(`/todos/${invalid_id}`)
    .expect(404)
    .end(done);
  })
});

describe('DELETE /todos/:id', () => {

  it('should delete todo doc and return doc', (done) => {
    var hexId = todos[0]._id.toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      // Query database to find the document using id
      Todo.findById(hexId).then((todo) => {
        expect(todo).toNotExist('Document cannot be found');
        done();
      }).catch((e) => done(e));
    });
  });

  it('should return 404 as doc does not exist', (done)=> {
    var hexId = new ObjectID().toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for invalid id', (done) => {
    request(app)
    .delete('/todos/abcde')
    .expect(404)
    .end(done);
  })
});

describe('PATCH /todos/:id', ()=> {
  it('should update the todo', (done) => {
    // Obtain id of first dummy document
    var hexId = todos[0]._id.toHexString();
    var text = "This is the correct text";

    // text is changed, completed is true, completedAt is a number
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      text,
      completed: true,
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completedAt).toBeA('number');
    })
    .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var hexId = todos[1]._id.toHexString();
    var text = "This is the updated text";

    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      text,
      completed: false
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);
  });
});
