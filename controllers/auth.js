const User = require('../models/user');
const { validationResult } = require('express-validator/check');

exports.getLogin = (req, res, next) => {};

exports.getSignup = (req, res, next) => {};

exports.postLogin = (req, res, next) => {};

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      const user = new User({
        email: email,
        password: password,
        name: name
      });
      return user.save();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {};
