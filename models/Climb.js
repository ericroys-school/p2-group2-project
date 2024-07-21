const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Climb extends Model {}

Climb.init(
    {

    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'climb',
    }
);

module.exports = Climb;