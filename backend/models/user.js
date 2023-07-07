const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'минимальная длина поля "name" - 2 символа'],
    maxlength: [30, 'максимальная длина поля "name" - 30 символов'],
    // required: [true, 'поле "name" должно быть заполнено'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'минимальная длина поля "about" - 2 символа'],
    maxlength: [30, 'максимальная длина поля "about" - 30 символов'],
    // required: [true, 'поле "about" должно быть заполнено'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    trim: true,
    // required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    trim: true, // обрезает пробелы с обоих сторон
    lowercase: true,
    unique: true,
    required: [true, 'поле "email" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный формат почты',
    },
  },
  password: {
    type: String,
    select: false, // что бы не выводился пароль
    trim: true, // обрезает пробелы с обоих сторон
    required: [true, 'поле "password" должно быть заполнено'],
    minlength: [3, 'минимальная длина поля "password" - 3 символа'],
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }) // попытаемся найти пользователя по почте, this — это модель User
    .select('+password')
    .then((user) => {
      if (!user) { // не нашёлся — отклоняем промис
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password) // нашёлся — сравниваем хеши
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
