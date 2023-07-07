const { celebrate, Joi } = require('celebrate');
const routerCards = require('express').Router();
// eslint-disable-next-line object-curly-newline
const { createCard, getCards, delCard, likeCard, dislikeCard } = require('../controllers/cards');

routerCards.post('/cards', celebrate({ // Создаем новую карточку
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^(http|https):\/\/[\w.-]+(\/[\w-./?#@$!&'()*+,;=]*)?#?$/i),
  }),
}), createCard);

routerCards.get('/cards', getCards); // Получаем все карточки

routerCards.delete('/cards/:_id', celebrate({ // Удаляем карточку
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
}), delCard);

routerCards.put('/cards/:_id/likes', celebrate({ // Лайк карточки
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
}), likeCard);

routerCards.delete('/cards/:_id/likes', celebrate({ // Дизлайк карточки
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
}), dislikeCard);

module.exports = routerCards;
