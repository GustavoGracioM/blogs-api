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

module.exports = {
  throwInvalidFieldsError,
  throwEmailIsRegistered,
};