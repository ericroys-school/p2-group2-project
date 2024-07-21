import { Sequelize, UUIDV4} from 'sequelize';
const { Model, DataTypes } = Sequelize;
import { dbConnect } from '../config/connection.js';


export class Activity_Comment extends Model {}

Activity_Comment.init(
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
        modelName: 'activity_comment',
    }
);