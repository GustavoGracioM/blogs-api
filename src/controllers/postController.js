require('dotenv').config();
const jwt = require('jsonwebtoken');
const postService = require('../services/postService');

const postController = {
  async add(req, res) {
    const { title, content, categoryIds } = req.body;
    await postService.checkIsExistCategory(categoryIds);
    const token = req.headers.authorization;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const post = await postService.add(title, content, id, categoryIds);
    res.status(201).json(post);
  },
  async get(_req, res) {
    const posts = await postService.get();
    res.status(200).json(posts);
  },
  async getById(req, res) {
    const { id } = req.params;
    const post = await postService.getById(id);
    res.status(200).json(post);
  },
  async update(req, res) {
    const id = Number(req.params.id);
    const { title, content } = req.body;
    const token = req.headers.authorization;
    const idJWT = jwt.verify(token, process.env.JWT_SECRET).id;
    await postService.update(id, idJWT, title, content);
    const postUpdated = await postService.getById(id);
    res.status(200).json(postUpdated);
  },
};

module.exports = postController;