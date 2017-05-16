const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

// https://www.npmjs.com/package/supertest
//https://github.com/mjackson/expect

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos = [{_id: new ObjectID(), text: "First text"},
  {_id: new ObjectID(), text: "Second text"}]; // dummy values

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

})
