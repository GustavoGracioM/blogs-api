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
};

module.exports = postController;