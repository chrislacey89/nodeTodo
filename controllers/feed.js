const TodoItem = require('../models/todoItems');
const uuid = require('uuid');

//todo: fetching works. How to pass result to font end?
// Gets all todos
exports.getTodos = (req, res) => {
  TodoItem.find()
    .then(todos => {
      res
        .status(200)
        .json({ message: 'Feteched items successfully.', todos: todos });
    })
    .catch(err => console.log(err));
};

// Create todo
exports.createTodo = (req, res) => {
  const title = req.body.title;
  const completed = false;
  const newTodoItem = new TodoItem({ title: title, completed: completed });
  res.status(200).json({
    message: 'Item Created',
    todo: newTodoItem
  });
  newTodoItem.save().then(result => {
    console.log(`Created Item: ${result}`);
  });

  // todos.push(newTodo);
  //   res.json(todos);
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
