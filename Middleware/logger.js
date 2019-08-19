const logger = (req, res, next) => {
  console.log('Hello');
  next();
};

module.exports = logger;
