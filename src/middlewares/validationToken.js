require('dotenv').config();
const jwt = require('jsonwebtoken');
const { throwNotFoundToken } = require('./utils');

const validationToken = (req, res, next) => {
  const token = req.headers.authorization; 
  if (!token) throwNotFoundToken('Token not found');
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    throwNotFoundToken('Expired or invalid token');
  }
};

module.exports = validationToken;