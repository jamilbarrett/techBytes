const { Model, DataTypes } = require('sequelize');
const { hash, compare } = require('bcrypt');
const Article = require('./Article')
const db = require('../config/connection.js');

class User extends Model { }

User.init({
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },


  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      min: 5
    }
  },


  password: {
    type: DataTypes.STRING,
    validate: {
      min: 6
    }
  }
}, {
  sequelize: db,
  modelName: 'user',
  hooks: {
    async beforeCreate(user) {
      const hashPassword = await hash(user.password, 10);
      user.password = hashPassword;
    }
  }
});

User.prototype.validatePass = async function (formPassword) {
  const isValid = await compare(formPassword, this.password);
  return isValid;
};

User.hasMany(Article, {
  foreignKey: 'userId', 
  onDelete: 'CASCADE', 
});


module.exports = User;
