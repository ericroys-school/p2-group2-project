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
        }
    },
    {
        sequelize: dbConnect,
        freezeTableName: true,
        timestamps: false,
        modelName: 'climb_activity',
    }
);
