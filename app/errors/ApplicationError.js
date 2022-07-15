class ApplicationError extends Error {
  get details() {
    return {
      name: this.name,
      message: this.message,
    };
  }

  toJSON() {
    return {
      error: {
        message: this.message,
      },
    };
  }
}

module.exports = ApplicationError;
