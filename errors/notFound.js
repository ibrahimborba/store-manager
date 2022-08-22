const notFound = (message) => {
  const err = new Error(message);
  err.status = 404;
  throw err;
};

module.exports = notFound;