const { throwInvalidFieldsError } = require('./utils');

const validationDisplayName = (displayName) => {
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

const validationAddPost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds || !Array.isArray(categoryIds)) {
    throwInvalidFieldsError('Some required fields are missing');
  }
  next();
};

const validateInfos = (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throwInvalidFieldsError('Some required fields are missing');
  next();
};

const validationFields = (req, _res, next) => {
  const { displayName, email, password } = req.body;
  validationDisplayName(displayName);
  validationEmail(email);
  validationPassword(password);
  next();
};

const validationName = (req, _res, next) => {
  const { name } = req.body;
  if (!name) throwInvalidFieldsError('"name" is required');
  next();
};

module.exports = {
  validateInfos,
  validationFields,
  validationName,
  validationAddPost,
};