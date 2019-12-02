const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../../controllers/auth');

const User = require('../../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

// router.post('/signup', authController.postSignup);

router.post(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password less than 5 char.'),
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter a name.')
  ],
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;
