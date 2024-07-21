const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Location extends Model {}

Location.init(
    {

    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'location',
    }
);

module.exports = Location;