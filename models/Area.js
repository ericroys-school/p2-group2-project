const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Area extends Model {}

Area.init(
    {

    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'area',
    }
);

module.exports = Area;