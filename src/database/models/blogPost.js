const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  published: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updated: {
    allowNull: false,
    type: DataTypes.DATE
  },
};

module.exports = (sequelize) => {
  const blogsPost = sequelize.define('BlogPost', attributes, { tableName: 'BlogPosts', timestamps: false });
  blogsPost.associate = (models) => {
    blogsPost.belongsTo(models.User, { foreignKey: 'id', as: 'User' });
  };
  return blogsPost;
};