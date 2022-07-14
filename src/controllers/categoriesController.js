const categoriesService = require('../services/categoriesService');

const categoriesController = {
  async add(req, res) {
    const { name } = req.body;
    const x = await categoriesService.add(name);
    res.status(201).json(x);
  },
  async get(req, res) {
    const categories = await categoriesService.get();
    res.status(200).json(categories);
  },
};

module.exports = categoriesController;