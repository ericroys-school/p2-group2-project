import { Sequelize, UUIDV4} from 'sequelize';
const { Model, DataTypes } = Sequelize;
import { dbConnect } from '../config/connection.js';

export class Location extends Model {}

Location.init(
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
        modelName: 'location',
    }
);
