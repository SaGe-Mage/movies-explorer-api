# Дипломная работа
## Movies explorer

### Краткое описание API сервиса.

#### Data API:

`GET /users/me`

Возвращает информацию о пользователе (email и имя).

`PATCH /users/me`

Обновляет информацию о пользователе (email и имя).

`GET /movies`

Возвращает все сохранённые пользователем фильмы.

`POST /movies`

Создаёт фильм с переданными в теле полями:
_country, director, duration, year, description, image, trailer, movieId, nameRU, nameEN и thumbnail._

`DELETE /movies/movieId`

Удаляет сохранённый фильм по _id.

#### Auth API:

`POST /signup`

Cоздаёт пользователя с переданными в теле полями:
_email, password и name._

`POST /signin`

Проверяет переданные в теле почту и пароль. Помещает JWT токен
в cookies и возвращает данные пользователя.

`GET /signin`

Удаляет JWT токен из cookies.
