const express = require('express');
const path = require('path');
const logger = require('./Middleware/logger');

const app = express();

// Init middleware
// app.use(logger);

// Set static folder
app.use(express.static(path.join(__dirname, 'Public')));

// API routs -Todos
app.use('/api/todos', require('./Routes/API/todos'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
