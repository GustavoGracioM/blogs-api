const { Router } = require('express');
const usersController = require('../controllers/usersController');

const loginRouter = Router();

loginRouter.post('/', usersController.login);

module.exports = loginRouter;