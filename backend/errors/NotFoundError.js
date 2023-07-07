class NotFoundError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 404;
    this.message = 'Запрашиваемые данные не найдены';
  }
}

module.exports = NotFoundError;
