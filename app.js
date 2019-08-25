const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const logger = require('./Middleware/logger');
const feedRoutes = require('./Routes/API/todos');

const app = express();

// Init middleware
// app.use(logger);

// Body Parser Middleware
//par
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'Public')));

// Todo: remove when deploying app
//Set Cors Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// API routs -Todos
app.use('/api/todos', feedRoutes);

mongoose
  .connect(
    'mongodb+srv://chrislacey89:yHpJgY3pAm3WJWZS@todolist-unvzr.mongodb.net/todoList?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });

//Password: yHpJgY3pAm3WJWZS