import { Sequelize, UUIDV4} from 'sequelize';
const { Model, DataTypes } = Sequelize;
import { dbConnect } from '../config/connection.js';

export class Climb_Comment extends Model {}

Climb_Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false
        },

        climb_id: {
            type: DataTypes.UUID, 
            references:{ 
                model: 'climb',
                key: 'id' 

            }

        },

        user_id: {
            type: DataTypes.UUID, 
            references:{ 
                model: 'user_c',
                key: 'id' 

            }

        },

        text: {
            type: DataTypes.STRING,
            allowNull: false

        }

    },
    {
        sequelize: dbConnect,
        freezeTableName: true,
        timestamps: false,
        modelName: 'climb_comment',
    }
);
