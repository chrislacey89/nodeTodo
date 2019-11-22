const TodoItem = require('../models/todoItems');

const { validationResult } = require('express-validator/check');

//todo: fetching works. How to pass result to font end?
// Gets all todos
exports.getTodos = async (req, res, next) => {
  try {
    let todos = await TodoItem.find();
    res
      .status(200)
      .json({ message: 'Feteched items successfully.', todos: todos });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Create todo
exports.createTodo = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const completed = false;
  const newTodoItem = new TodoItem({ title: title, completed: completed });

  res.status(201).json({
    message: 'Item Created',
    todo: newTodoItem
  });
  newTodoItem
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully!',
        post: result
      });
      console.log(`Created Item: ${result}`);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

  // todos.push(newTodo);
  //   res.json(todos);
};

exports.updateTodo = async (request, response) => {
  try {
    let todo = await TodoItem.findById(request.params.id);

    todo.set(request.body);

    let result = await todo.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
};

// Delete Member
exports.deleteTodo = async (request, response) => {
  try {
    let result = await TodoItem.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
    console.log(request);
  } catch (error) {
    response.status(500).send(error);
  }
};
