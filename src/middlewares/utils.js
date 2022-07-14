const throwInvalidFieldsError = (message) => {
  const err = new Error(message);
  err.name = 'throwInvalidFieldsError';
  throw err;
};

const throwEmailIsRegistered = (message) => {
  const err = new Error(message);
  err.name = 'throwEmailIsRegistered';
  throw err;
};

const throwNotFoundToken = (message) => {
  const err = new Error(message);
  err.name = 'throwNotFoundToken';
  throw err;
};

const throwNotFound = (message) => {
  const err = new Error(message);
  err.name = 'throwNotFound';
  throw err;
};

module.exports = {
  throwInvalidFieldsError,
  throwEmailIsRegistered,
  throwNotFoundToken,
  throwNotFound,
};