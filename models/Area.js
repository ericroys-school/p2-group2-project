import { Sequelize, UUIDV4} from 'sequelize';
import { dbConnect } from '../config/connection.js';
const { Model, DataTypes } = Sequelize;

export class Area extends Model {}

Area.init(
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
        modelName: 'area',
    }
);
