class UnauthorizedError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 401;
    this.message = 'Неверные логин или пароль';
  }
}

module.exports = UnauthorizedError;
