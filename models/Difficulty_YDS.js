const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Difficulty_YDS extends Model {}

Difficulty_YDS.init(
    {

    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'difficulty_yds',
    }
);

module.exports = Difficulty_YDS;