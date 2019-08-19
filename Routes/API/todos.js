const express = require('express');
const router = express.Router();
const todos = require('../../todos');

const uuid = require('uuid');

// Gets all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// Get single todo
router.get('/:id', (req, res) => {
  const found = todos.some(todo => todo.id === parseInt(req.params.id));

  if (found) {
    res.json(todos.filter(todo => todo.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ msg: `No todo item with the id of ${req.params.id}` });
  }
});

// Create todo
router.post('/', (req, res) => {
  const newTodo = {
    userId: 1,
    id: uuid.v4(),
    title: req.body.title,
    completed: false
  };
  if (!newTodo.title) {
    return res.status(400).json({ msg: 'Please add a todo before submitting' });
  }

  todos.push(newTodo);
  res.json(todos);
});

// Update todo item
router.put('/:id', (req, res) => {
  const found = todos.some(todo => todo.id === parseInt(req.params.id));

  if (found) {
    const updateTodo = req.body;
    todos.forEach(todo => {
      if (todo.id === parseInt(req.params.id)) {
        // if title or completed are updated and sent with request. If yes, we set to new title or completed
        todo.title = updateTodo ? updateTodo.title : todo.title;
        todo.completed = updateTodo ? updateTodo.completed : todo.completed;

        res.json({ msg: 'Todo was update', todo: todo });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `No todo item with the id of ${req.params.id}` });
  }
});
module.exports = router;
