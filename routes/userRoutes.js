const passport = require('passport');
const user = require('../controllers/userController');

module.exports = app => {
  app.route('/users/').post(user.createUser);
  app
    .route('/users/:name')
    .get(user.readUserByName)
    .put(user.updateUserBestScoreByName);
  app
    .route('/auth/google/')
    .get(
      passport.authenticate('google-token', { session: false }),
      (req, res) => res.send(req.user)
    );
};
