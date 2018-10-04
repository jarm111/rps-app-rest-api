module.exports = app => {
  const user = require('../controllers/userController');

  app.route('/users/').post(user.createUser);
  app
    .route('/users/:name')
    .get(user.readUserByName)
    .put(user.updateUserBestScoreByName);
};
