const router = require('express').Router();
const { validateUserUpdate, validateLogin, validateUser } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const {
  login,
  createProfile,
  getCurrentUser,
  updateProfile,
  logout,
} = require('../controllers/users');

router.post('/signup', validateUser, createProfile);
router.post('/signin', validateLogin, login);

router.get('/users/me', auth, getCurrentUser);
router.get('/signout', auth, logout);
router.patch('/users/me', auth, validateUserUpdate, updateProfile);

module.exports = router;
