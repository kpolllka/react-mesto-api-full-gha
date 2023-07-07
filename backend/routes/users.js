/* eslint-disable object-curly-newline */
const { celebrate, Joi } = require('celebrate');
const routerUser = require('express').Router();
const { getUsers, getUserId, editUser, editAvatar, getAuthProfile } = require('../controllers/users');

// routerUser.post('/users', createUser); // Создаём пользователя
// routerUser.post('/signup', createUser); // Регистрация пользователя
// routerUser.post('/signin', login); // Авторизация пользователя
routerUser.get('/users', getUsers); // Получаем всех пользователей

routerUser.get('/users/me', getAuthProfile); // Получаем данные об авторизованном пользователе

routerUser.get('/users/:_id', celebrate({ // Получаем пользователя по ID
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
}), getUserId);

routerUser.patch('/users/me', celebrate({ // Редактируем данные пользователя
  body: Joi.object().required().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), editUser);

routerUser.patch('/users/me/avatar', celebrate({ // Редактируем аватар пользователя
  body: Joi.object().required().keys({
    avatar: Joi.string().required().regex(/^(http|https):\/\/[\w.-]+(\/[\w-./?#@$!&'()*+,;=]*)?#?$/i),
  }),
}), editAvatar);

module.exports = routerUser;
