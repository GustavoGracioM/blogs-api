const { Router } = require('express');
const usersController = require('../controllers/usersController');
const { validationFields } = require('../middlewares/validation');
const validationToken = require('../middlewares/validationToken');

const userRouter = Router();

userRouter.post('/', validationFields, usersController.add);
userRouter.get('/', validationToken, usersController.get);

module.exports = userRouter;