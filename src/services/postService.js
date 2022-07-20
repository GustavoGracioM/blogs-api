const { Op } = require('sequelize');
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
  async checkIsExistPost(id) {
    const post = await models.BlogPost.findByPk(id);
    if (!post) throwNotFound('Post does not exist');
    return post;
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
  async delete(id, idJWT, userId) {
    if (userId !== idJWT) throwNotFoundToken('Unauthorized user');
    await models.BlogPost.destroy({ where: { id } });
  },
  async getBySearch(content) {
    const posts = await models.BlogPost.findAll({
      where: 
        { [Op.or]: [
          { title: { [Op.like]: `%${content}%` } },
          { content: { [Op.like]: `%${content}%` } },
          ], 
        }, 
      include: 
        { model: models.Category, as: 'Category', through: { attributes: [] } }, 
      raw: true, 
      });
    if (!posts) return this.postService.get();
    const postsTemplate = posts.map(async (p) => template(p));
    const result = await Promise.all(postsTemplate);
    return result;
  },
};

module.exports = postService;
