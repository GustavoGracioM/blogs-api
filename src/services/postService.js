const models = require('../database/models');
const { throwInvalidFieldsError } = require('../middlewares/utils');

const postService = {
  async add(title, content, userId, categoryIds) {
    try {
      const post = await models.BlogPost.create({
        title, content, userId, published: new Date(), updated: new Date(),
      });
      const categories = categoryIds
        .map(async (c) => models.PostCategory.create({ postId: post.id, categoryId: c }));
      Promise.all(categories);
      return post;
    } catch (err) {
      throw new Error(err);
    }
  },
  async checkIsExistCategory(categoryIds) {
    const categories = categoryIds.map(async (id) => models.Category.findByPk(id));
    const result = await Promise.all(categories);
    if (result.indexOf(null) !== -1) throwInvalidFieldsError('"categoryIds" not found');
  },
};

module.exports = postService;
