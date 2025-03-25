import sequelize from "../Config/sequelize.config.js";
import { DataTypes, Model } from "sequelize";
import { Event } from "./event.model.js";
import { User } from "./user.model.js";

export class UserEvent extends Model {}

UserEvent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Event,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "user_event",
    underscored: true,
    freezeTableName: true,
    timestamps: true,
  }
);
