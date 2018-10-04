module.exports = app => {
  const user = require('../controllers/userController');

  app.route('/users').get(user.addUser);
};
