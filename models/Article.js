const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection.js');

class Article extends Model { }

Article.init({
    article_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entry: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'article',
  }
);

module.exports = Article;
