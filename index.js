const express = require('express');
const path = require('path');
const todos = require('./todos');
const logger = require('./Middleware/logger');

const app = express();

// Init middleware
// app.use(logger);

// Gets all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Get single todo
app.get('/api/todos/:id', (req, res) => {
  res.json(todos.filter(todo => todo.id === parseInt(req.params.id)));
});

// Set static folder
app.use(express.static(path.join(__dirname, 'Public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
