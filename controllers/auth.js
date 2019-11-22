const User = require('../models/user');

exports.getLogin = (req, res, next) => {};

exports.getSignup = (req, res, next) => {};

exports.postLogin = (req, res, next) => {};

exports.postSignup = (req, res, next) => {
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
