const models = require('../database/models');
const { 
  throwInvalidFieldsError,
   throwNotFound, 
   throwNotFoundToken } = require('../middlewares/utils');

const template = async (post) => {
  const user = await models
    .User.findByPk(post.userId, { raw: true, attributes: { exclude: ['password'] } });
    const categories = [{ id: post['Category.id'], name: post['Category.name'] }];
    const newPosts = { 
      id: post.id, 
      title: post.title, 
      content: post.content, 
      userId: post.userId, 
      published: post.published,
      updated: post.updated,
      user,
      categories };
    return newPosts;
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
  async get() {
    const posts = await models.BlogPost
      .findAll(
        { include: 
          { model: models.Category, as: 'Category', through: { attributes: [] } }, 
          raw: true,
        },
    );
    const postCategoryUser = posts.map(async (post) => template(post));
    const result = await Promise.all(postCategoryUser);
    return result;
  },
  async getById(id) {
    const posts = await models.BlogPost
      .findByPk(
        id,
        { include: 
          { model: models.Category, as: 'Category', through: { attributes: [] } }, 
          raw: true,
        },
    );
    if (!posts) throwNotFound('Post does not exist');
    const result = await template(posts);
    return result;
  },
  async update(id, idJWT, title, content) {
    if (id !== idJWT) throwNotFoundToken('Unauthorized user');
    await models.BlogPost.update({ title, content, updated: new Date() }, { where: { id } });
  },
};

module.exports = postService;
