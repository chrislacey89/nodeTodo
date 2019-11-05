const express = require('express');
const router = express.Router();

const feedController = require('../../controllers/feed');

// Gets all todos
router.get('/', feedController.getTodos);

// Get single todo
// router.get('/:id', feedController.getSingleTodo);

// Create todo
router.post('/', feedController.createTodo);

// Update todo item
router.put('/:id', feedController.updateTodo);

// Delete Member
router.delete('/:id', feedController.deleteTodo);

module.exports = router;

exports.deleteTodo = async (request, response) => {
  try {
    let result = await TodoItem.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
};
