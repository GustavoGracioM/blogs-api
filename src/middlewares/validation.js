const { throwInvalidFieldsError } = require('./utils');

const validationName = (displayName) => {
  if (!displayName || displayName.length < 8) {
    throwInvalidFieldsError('"displayName" length must be at least 8 characters long');
  }
};

const validationEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  if (!email || !regex.test(email)) {
    throwInvalidFieldsError('"email" must be a valid email');
  }
};

const validationPassword = (password) => {
  if (!password || password.length < 6) {
    throwInvalidFieldsError('"password" length must be at least 6 characters long');
  }
};

const validateInfos = (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throwInvalidFieldsError('Some required fields are missing');
  next();
};

const validationFields = (req, _res, next) => {
  const { displayName, email, password } = req.body;
  validationName(displayName);
  validationEmail(email);
  validationPassword(password);
  next();
};

module.exports = {
  validateInfos,
  validationFields,
};