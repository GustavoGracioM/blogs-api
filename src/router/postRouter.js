const { Router } = require('express');
const postController = require('../controllers/postController');
const validationToken = require('../middlewares/validationToken');
const { validationAddPost } = require('../middlewares/validation');

const postRouter = Router();

postRouter.post('/', validationToken, validationAddPost, postController.add);

module.exports = postRouter;