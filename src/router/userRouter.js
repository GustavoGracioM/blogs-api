const { Router } = require('express');
const usersController = require('../controllers/usersController');
const { validationFields } = require('../middlewares/validation');

const userRouter = Router();

userRouter.post('/', validationFields, usersController.add);

module.exports = userRouter;