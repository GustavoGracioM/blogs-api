const throwInformationInvalidError = (message) => {
  const err = new Error(message);
  err.name = 'throwInformationInvalidError';
  throw err;
};

const throwInvalidFieldsError = (message) => {
  const err = new Error(message);
  err.name = 'throwInvalidFieldsError';
  throw err;
};

module.exports = {
  throwInformationInvalidError,
  throwInvalidFieldsError,
};