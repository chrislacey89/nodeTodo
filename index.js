const express = require('express');
const path = require('path');
const todos = require('./todos');

const app = express();

// Gets all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Set static folder
app.use(express.static(path.join(__dirname, 'Public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
