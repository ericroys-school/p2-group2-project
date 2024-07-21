import { Sequelize, UUIDV4} from 'sequelize';
const { Model, DataTypes } = Sequelize;
import { dbConnect } from '../config/connection.js';

export class User extends Model {}

User.init(
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
        modelName: 'user_c',
    }
);

