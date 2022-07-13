const { Router } = require('express');
const usersController = require('../controllers/usersController');
const { validateInfos } = require('../middlewares/validation');

const loginRouter = Router();

loginRouter.post('/', validateInfos, usersController.login);

module.exports = loginRouter;