const { DataTypes } = require('sequelize');

const attributes = {
  postId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  categoryId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
};

module.exports = (sequelize, _DataTypes) => {
  const postCategory = sequelize.define('PostCategory', attributes, { timestamps: false } );
  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'Category',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPost',
      through: postCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return postCategory;
};