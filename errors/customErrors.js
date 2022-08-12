const customError = (status, messsage) => {
  const err = new Error(messsage);
  err.status = status;
  throw err;
};

module.exports = { customError };
