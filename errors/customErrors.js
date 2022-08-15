const customError = (status, message) => {
  console.log(status, message);
  const err = new Error(message);
  err.status = status;
  throw err;
};

module.exports = { customError };
