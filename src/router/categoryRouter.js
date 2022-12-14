const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');
const validationToken = require('../middlewares/validationToken');
const { validationName } = require('../middlewares/validation');

const categoryRouter = Router();

categoryRouter.post('/', validationToken, validationName, categoriesController.add);
categoryRouter.get('/', validationToken, categoriesController.get);

module.exports = categoryRouter;