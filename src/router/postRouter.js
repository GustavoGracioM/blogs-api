const { Router } = require('express');
const postController = require('../controllers/postController');
const validationToken = require('../middlewares/validationToken');
const { validationAddPost, validationUpdatePost } = require('../middlewares/validation');

const postRouter = Router();

postRouter.post('/', validationToken, validationAddPost, postController.add);
postRouter.get('/', validationToken, postController.get);
postRouter.get('/:id', validationToken, postController.getById);
postRouter.put('/:id', validationToken, validationUpdatePost, postController.update);

module.exports = postRouter;