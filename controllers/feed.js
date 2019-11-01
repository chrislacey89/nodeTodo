const TodoItem = require('../models/todoItems');
const uuid = require('uuid');

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

exports.getSingleTodo = async (request, response) => {
  try {
    let todo = await TodoItem.findById(request.params.id);
    response.send(todo);
    todo.set(request.body);

    let result = await todo.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
};

// Update todo item
// exports.updateTodo = (req, res, next) => {
//   const todoId = req.params.id;
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error('Validation failed, entered data is incorrect.');
//     error.statusCode = 422;
//     throw error;
//   }

//   const title = req.body.title;
//   const completed = req.body.completed;

//   TodoItem.findById(todoId)
//     .then(todo => {
//       if (!todo) {
//         const error = new Error('Could not find post.');
//         error.statusCode = 404;
//         throw error;
//       }

//       todo.title = title;
//       todo.completed = completed;
//       return todo.save();
//     })
//     .then(result => {
//       res.status(200).json({ message: 'Todo item updated!', todos: result });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

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
