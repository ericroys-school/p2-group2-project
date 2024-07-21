const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Climb_Comment extends Model {}

Climb_Comment.init(
    {

    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'climb_comment',
    }
);

module.exports = Climb_Comment;