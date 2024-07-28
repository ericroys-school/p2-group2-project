import { Model, DataTypes, UUIDV4 } from "sequelize";
import { dbConnect } from "../config/connection.js";
import { Location } from "./Location.js";

export class Area extends Model {}

Area.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    coordinates: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location_id: {
      type: DataTypes.UUID,
      references: {
        model: Location,
        key: "id",
      },
    },
  },
  {
    sequelize: dbConnect,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "area",
  }
);