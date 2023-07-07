/* eslint-disable object-curly-newline */
const Card = require('../models/card');

const STATUS_CREATE = require('../errors/notErrors'); // 201 - карточка успешно создана
const BadRequest = require('../errors/BadRequestError'); // 400 - переданы некорректные данные
const ForbiddenError = require('../errors/ForbiddenError'); // 403 - ошибка прав доступа
const NotFoundError = require('../errors/NotFoundError'); // 404 - запрашиваемые данные не найдены

// Создание новой карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerID = req.user._id;

  Card.create({ name, link, owner: ownerID })
    .then((card) => res.status(STATUS_CREATE).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(err.message));
        return;
      }
      next(err);
    });
};

// Получение всех карточек
const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

const delCard = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;
  Card.findById(cardId)
    .orFail((err) => new NotFoundError(err))
    .then((card) => {
      if (card.owner.toString() === userId) {
        Card.deleteOne(card)
          .then(() => res.send(card))
          .catch(next);
      } else {
        throw new ForbiddenError('Недостаточно прав для удаления');
      }
    })
    .catch(next);
};

// Лайк карточки
const likeCard = (req, res, next) => {
  const ownerID = req.user._id;
  const cardId = req.params._id;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: ownerID } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(err.message));
      } else if (err.message === 'NotValidId') {
        next(new NotFoundError(err.message));
        return;
      }
      next(err);
    });
};

// Дизлайк карточки
function dislikeCard(req, res, next) {
  const ownerID = req.user._id;
  const cardId = req.params._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: ownerID } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(err.message));
      } else if (err.message === 'NotValidId') {
        next(new NotFoundError(err.message));
        return;
      }
      next(err);
    });
}

module.exports = { createCard, getCards, delCard, likeCard, dislikeCard };
