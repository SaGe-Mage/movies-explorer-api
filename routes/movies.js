const router = require('express').Router();
const { validateMovie, validateId } = require('../middlewares/validation');

const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', validateMovie, createMovies);
router.delete('/movies/:_id', validateId, deleteMovies);

module.exports = router;
