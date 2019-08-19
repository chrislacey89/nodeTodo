const express = require('express');
const router = express.Router();
const todos = require('../../todos');

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

module.exports = router;
