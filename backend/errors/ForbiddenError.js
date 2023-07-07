class ForbiddenError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 403;
    this.message = 'Ошибка прав доступа';
  }
}

module.exports = ForbiddenError;
