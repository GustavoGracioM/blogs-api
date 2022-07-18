const models = require('../database/models');
const { throwInvalidFieldsError } = require('../middlewares/utils');

const serial = (post, user) => {
  const categories = [{ id: post['Category.id'], name: post['Category.name'] }];
  const result = { 
    id: post.id, 
    title: post.title, 
    content: post.content, 
    userId: post.userId, 
    published: post.published,
    updated: post.updated,
    user,
    categories };
  return result;
};

const postService = {
  async checkIsExistCategory(categoryIds) {
    const categories = categoryIds.map(async (id) => models.Category.findByPk(id));
    const result = await Promise.all(categories);
    if (result.indexOf(null) !== -1) throwInvalidFieldsError('"categoryIds" not found');
  },
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
  async getPostCategory() {
    const posts = await models.BlogPost
      .findAll(
        { include: 
          { model: models.Category, as: 'Category', through: { attributes: [] } }, 
          raw: true,
        },
    );
    return posts;
  },
  async get() {
    const posts = await this.getPostCategory();
    const postCategoryUser = posts.map(async (c) => {
      const user = await models.User
        .findByPk(c.id, { raw: true, attributes: { exclude: ['password'] } });
      return serial(c, user);
    });
    const result = await Promise.all(postCategoryUser);
    console.log(result[0].categories);
    return result;
  },
};

module.exports = postService;
