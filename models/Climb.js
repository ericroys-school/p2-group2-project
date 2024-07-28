import { Model, DataTypes, UUIDV4 } from "sequelize";
import { dbConnect } from "../config/connection.js";
import { Area } from "./Area.js";

export class Climb extends Model {}

Climb.init(
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

    area_id: {
      type: DataTypes.UUID,
      references: {
        model: Area,
        key: "id",
      },
    },
    difficulty_id: {
      type: DataTypes.UUID,
      references: {
        model: "difficulty_yds",
        key: "id",
      },
    },
    length: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    coordinates: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    sequelize: dbConnect,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "climb",
  }
);
