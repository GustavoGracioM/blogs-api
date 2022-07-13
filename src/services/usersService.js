require('dotenv').config();
const jwt = require('jsonwebtoken');
const { throwInformationInvalidError, throwInvalidFieldsError } = require('./utils');
const models = require('../database/models');

const usersService = {
  async validateInfos(email, password) {
    if (!email || !password) throwInformationInvalidError('Some required fields are missing');
  },
  async login(email, password) {
    const result = await models.User.findOne({ where: { email, password }, raw: true });
    console.log('AQQUI: ', result);
    if (!result) throwInvalidFieldsError('Invalid fields');
    const token = jwt.sign({ email, id: result.id }, process.env.JWT_SECRET);
    return token;
  },
};

module.exports = usersService;