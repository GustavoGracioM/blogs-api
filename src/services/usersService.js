require('dotenv').config();
const jwt = require('jsonwebtoken');
const models = require('../database/models');
const { throwInvalidFieldsError, throwEmailIsRegistered } = require('../middlewares/utils');

const usersService = {
  async login(email, password) {
    const result = await models.User.findOne({ where: { email, password }, raw: true });
    console.log('AQQUI: ', result);
    if (!result) throwInvalidFieldsError('Invalid fields');
    const token = jwt.sign({ email, id: result.id }, process.env.JWT_SECRET);
    return token;
  },
  async checkIsNotExistUser(email) {
    const result = await models.User.findOne({ where: { email }, raw: true });
    if (result) throwEmailIsRegistered('User already registered');
  },
  async add(displayName, email, password, image) {
    await models.User.create({ displayName, email, password, image });
    const result = await models.User.findOne({ where: { email }, raw: true });
    const token = jwt.sign({ email, id: result.id }, process.env.JWT_SECRET);
    return token;
  },
};

module.exports = usersService;