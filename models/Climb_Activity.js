import { Model, DataTypes, UUIDV4 } from "sequelize";
import { dbConnect } from "../config/connection.js";
import { Climb } from "./Climb.js";
import { User } from "./User.js";

export class Climb_Activity extends Model {}

Climb_Activity.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    completed_time: {
      type: DataTypes.BIGINT,
    },

    completed: {
      type: DataTypes.BOOLEAN,
    },

    climb_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Climb,
        key: "id",
      },
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize: dbConnect,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "climb_activity",
    indexes: [{ unique: true, fields: ["climb_id", "user_id"] }],
  }
);
