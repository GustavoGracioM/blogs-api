const models = require('../database/models');

const categoriesService = {
  async add(name) {
    const category = await models.Category.create({ name });
    return category;
  },
  async get() {
    const categories = await models.Category.findAll({ raw: true });
    return categories;
  },
};

module.exports = categoriesService;