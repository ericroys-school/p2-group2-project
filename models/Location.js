import { Model, DataTypes, UUIDV4 } from "sequelize";
import { dbConnect } from "../config/connection.js";

export class Location extends Model {}

Location.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  },
  {
    sequelize: dbConnect,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "location",
  }
);
