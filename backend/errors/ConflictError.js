class ConflictError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 409;
    this.message = 'Такой пользователь уже существует';
  }
}

module.exports = ConflictError;
