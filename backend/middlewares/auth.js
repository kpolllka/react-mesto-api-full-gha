const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Проверка');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET_KEY');
    // payload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError('Проверка');
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};

// авторизация для логина с куками
// const auth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   let payload;

//   try {
//     payload = jwt.verify(token, process.env.SECRET_KEY);
//   } catch (err) {
//     return res.status(401).send({ message: 'Необходима авторизация' });
//   }

//   req.user = payload; // записываем пейлоуд в объект запроса
//   next(); // пропускаем запрос дальше
// };

module.exports = auth;
