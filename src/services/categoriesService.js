const models = require('../database/models');

const categoriesService = {
  async add(name) {
    const x = await models.Category.create({ name });
    return x;
  },
};

module.exports = categoriesService;