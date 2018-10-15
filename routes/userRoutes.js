const passport = require('passport');
const user = require('../controllers/userController');

module.exports = app => {
  app
    .route('/user/auth/google/')
    .get(
      passport.authenticate('google-token', { session: false }),
      user.getTokenAndBestScore
    );
  app
    .route('/user/score/')
    .put(user.authenticateUser, user.updateUserBestScore);
};
