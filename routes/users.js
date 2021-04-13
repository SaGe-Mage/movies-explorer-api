const router = require('express').Router();
const { validateUserUpdate } = require('../middlewares/validation');

const {
  getCurrentUser,
  updateProfile,
  logout,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.get('/signout', logout);
router.patch('/users/me', validateUserUpdate, updateProfile);

module.exports = router;
