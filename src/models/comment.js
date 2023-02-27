const { JSONB } = require("sequelize");

const commentModel = (sequelize, DataTypes) => sequelize.define('comments', {
 
    comment_text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
  },{ timestamps: false, });
  
    
  
    module.exports = commentModel;
    