const uuid = require('uuid');

const todos = [
  {
    userId: 1,
    _id: uuid.v4,
    key: 1,
    title: 'delectus aut autem',
    completed: false
  },
  {
    userId: 1,
    _id: uuid.v4,
    _id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
  },
  {
    userId: 1,
    _id: uuid.v4,
    _id: 3,
    title: 'fugiat veniam minus',
    completed: true
  }
];

module.exports = todos;
