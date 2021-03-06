const Movie = require('../models/movie');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

function getMovies(req, res, next) {
  return Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200)
      .send(movies))
    .catch(next);
}

function createMovies(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      }
      return next;
    });
}

function deleteMovies(req, res, next) {
  return Movie.findById(req.params._id)
    .orFail()
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Переданы некорректные данные');
      }
      throw new NotFound('Нет карточки с таким id');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new Forbidden('Недостаточно прав для выполнения операции');
      }
      movie.remove()
        .then(() => res.send(movie))
        .catch(next);
    })
    .catch(next);
}

module.exports = {
  getMovies,
  createMovies,
  deleteMovies,
};
