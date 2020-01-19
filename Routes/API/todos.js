const express = require('express');
const router = express.Router();

const feedController = require('../../controllers/feed');
const isAuth = require('../../Middleware/is-auth');

// Gets all todos
// todo: add isAuth for Authentication  router.get('/', isAuth, feedController.getTodos);

router.get('/', isAuth, feedController.getTodos);

// Get single todo
// router.get('/:id', feedController.getSingleTodo);

// Create todo
router.post('/', isAuth, feedController.createTodo);

// Update todo item
router.put('/:id', isAuth, feedController.updateTodo);

// Delete todo item
router.delete('/:id', isAuth, feedController.deleteTodo);

module.exports = router;
