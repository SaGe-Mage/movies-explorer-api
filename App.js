const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { login, createProfile } = require('./controllers/users');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const auth = require('./middlewares/auth');
const { validateLogin, validateUser } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3000, DB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to DB'));

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(requestLogger);

app.post('/signup', validateUser, createProfile);
app.post('/signin', validateLogin, login);

app.use('/', auth, usersRouter);
app.use('/', auth, moviesRouter);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: 'На сервере произошла ошибка' });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
