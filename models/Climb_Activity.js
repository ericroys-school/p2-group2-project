const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Climb_Activity extends Model {}

Climb_Activity.init(
    {

    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'climb_activity',
    }
);

module.exports = Climb_Activity;