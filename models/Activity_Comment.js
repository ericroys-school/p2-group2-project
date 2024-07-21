const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Activity_Comment extends Model {}

Activity_Comment.init(
    {

    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'activity_comment',
    }
);

module.exports = Activity_Comment;