import sequelize from "../Config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";

export class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "category",
    underscored: true,
    freezeTableName: true,
    timestamps: true,
  }
);
