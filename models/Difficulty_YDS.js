import { Sequelize, UUIDV4} from 'sequelize';
const { Model, DataTypes } = Sequelize;
import { dbConnect } from '../config/connection.js';

export class Difficulty_YDS extends Model {}

Difficulty_YDS.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false

        },

        climb_id: {
            type: DataTypes.UUID, 
            references:{ 
                model: 'climb',
                key: 'id' 

            }

        }


    },
    {
        sequelize: dbConnect,
        freezeTableName: true,
        timestamps: false,
        modelName: 'difficulty_yds',
    }
);
