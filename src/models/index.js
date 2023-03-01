"use strict";

require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const users = require("./users.js");
const item = require("./item");
const favorite = require("./fav");
const order=require("./order");
const comment = require("./comment");

const DataCollection = require("./lib/data-collection");

const DATABASE_URL =
  process.env.NODE_ENV === "test" ? "sqlite::memory" : process.env.DATABASE_URL;

const DATABASE_CONFIG =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG); //creat instant from sequelize

const userModel = users(sequelize, DataTypes); //use sequelize to creat model
const userCollection = new DataCollection(userModel);

const itemModel = item(sequelize, DataTypes);
const favoriteModel = favorite(sequelize, DataTypes);
const orderModel = order(sequelize, DataTypes);
const commentModel = comment(sequelize, DataTypes);


// Define associations
userModel.hasMany(itemModel);
userModel.hasMany(favoriteModel);
userModel.hasMany(orderModel);
userModel.hasMany(commentModel);

itemModel.belongsTo(userModel);
itemModel.hasMany(favoriteModel);
itemModel.hasMany(orderModel);
itemModel.hasMany(commentModel);

favoriteModel.belongsTo(userModel);
favoriteModel.belongsTo(itemModel);

orderModel.belongsTo(userModel);
orderModel.belongsTo(itemModel);

commentModel.belongsTo(userModel);
commentModel.belongsTo(itemModel);


// Create data collections
const itemCollection = new DataCollection(itemModel);
const favoriteCollection = new DataCollection(favoriteModel);
const orderCollection = new DataCollection(orderModel);
const commentCollection = new DataCollection(commentModel);
module.exports = {
  db: sequelize,
  users: users(sequelize, DataTypes),
  userCollection:userCollection,
  itemCollection: itemCollection,
  itemModel:itemModel,
  favoriteCollection: favoriteCollection,
  favoriteModel:favoriteModel,
  orderCollection: orderCollection,
  commentCollection: commentCollection,
};
