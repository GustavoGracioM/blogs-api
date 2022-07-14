const categoriesService = require('../services/categoriesService');

const categoriesController = {
  async add(req, res) {
    const { name } = req.body;
    const x = await categoriesService.add(name);
    res.status(201).json(x);
  },
};

module.exports = categoriesController;