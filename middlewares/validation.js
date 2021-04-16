const {
  celebrate,
  Joi,
  CelebrateError,
} = require('celebrate');
const validator = require('validator');

const urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError('Некорректный URL');
  }
  return value;
};

const validateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

const validateMovie = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string()
        .required(),
      director: Joi.string()
        .required(),
      duration: Joi.number()
        .required(),
      year: Joi.string()
        .required(),
      description: Joi.string()
        .required(),
      image: Joi.string()
        .required()
        .custom(urlValidation),
      trailer: Joi.string()
        .required()
        .custom(urlValidation),
      thumbnail: Joi.string()
        .required()
        .custom(urlValidation),
      movieId: Joi.number()
        .required(),
      nameRU: Joi.string()
        .required(),
      nameEN: Joi.string()
        .required(),
    }),
});

const validateLogin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});

const validateUserUpdate = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      email: Joi.string()
        .required()
        .email(),
    }),
});

const validateId = celebrate({
  params: Joi.object()
    .keys({
      _id: Joi.string()
        .required()
        .alphanum()
        .length(24)
        .hex(),
    }),
});

module.exports = {
  validateUser,
  validateLogin,
  validateUserUpdate,
  validateMovie,
  validateId,
};
