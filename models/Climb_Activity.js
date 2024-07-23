import { Sequelize, UUIDV4} from 'sequelize';
const { Model, DataTypes } = Sequelize;
import { dbConnect } from '../config/connection.js';

export class Climb_Activity extends Model {}

Climb_Activity.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false
        },

        completed_time: {
            type: DataTypes.INTEGER,
          

        },
        
        completed: {
            type: DataTypes.BOOLEAN,
          

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
                key:'id' 

            }

        },

    },
    {
        sequelize: dbConnect,
        freezeTableName: true,
        timestamps: false,
        modelName: 'climb_activity',
    }
);
