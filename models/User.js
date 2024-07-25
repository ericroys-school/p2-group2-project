import { Model, DataTypes, UUIDV4 } from "sequelize";
import { dbConnect } from "../config/connection.js";
import bcrypt from "bcrypt";

export class User extends Model {
  isValidPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      //between 8 and 25 chars length
      validate: {
        len: [8, 25]
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      //should be an email
      validate: {
        isEmail: true
      }
    },

    location_id: {
      type: DataTypes.UUID,
      references: {
        model: "location",
        key: "id",
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (userdata) => {
        userdata.password = await bcrypt.hash(userdata.password, 10);
        return userdata;
      },
      beforeUpdate: async (updateduserdata) => {
        updateduserdata.password = await bcrypt.hash(
          updateduserdata.password,
          10
        );
        return updateduserdata;
      },
    },

    sequelize: dbConnect,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "user",
  }
);
