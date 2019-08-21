const todos = require('../todos');
const uuid = require('uuid');

// Gets all todos
exports.getTodos = (req, res) => {
  res.json(todos);
};

// Get single todo
exports.getSingleTodo = (req, res) => {
  const found = todos.some(todo => todo.id === parseInt(req.params.id));

  if (found) {
    res
      .status(200)
      .json(todos.filter(todo => todo.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ msg: `No todo item with the id of ${req.params.id}` });
  }
};

// Create todo
exports.createTodo = (req, res) => {
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
};

// Update todo item
exports.updateTodo = (req, res) => {
  const found = todos.some(todo => todo.id === parseInt(req.params.id));

  if (found) {
    const updateTodo = req.body;
    todos.forEach(todo => {
      if (todo.id === parseInt(req.params.id)) {
        // if title or completed are updated and sent with request. If yes, we set to new title or completed
        todo.title = updateTodo ? updateTodo.title : todo.title;
        todo.completed = updateTodo ? updateTodo.completed : todo.completed;

        res.json({ msg: 'Todo was updated', todo: todo });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `No todo item with the id of ${req.params.id}` });
  }
};

// Delete Member
exports.deleteTodo = (req, res) => {
  const found = todos.some(todo => todo.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Todo item deleted',
      todos: todos.filter(todo => todo.id !== parseInt(req.params.id))
    });
  } else {
    res
      .status(400)
      .json({ msg: `No todo item with the id of ${req.params.id}` });
  }
};
