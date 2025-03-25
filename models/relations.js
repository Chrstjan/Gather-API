import { Category } from "./category.model.js";
import { Event } from "./event.model.js";
import { User } from "./user.model.js";

export const setRelations = () => {
  // Event / Category relation
  Event.belongsTo(Category, {
    foreignKey: "category_id",
    as: "category",
  });
  Category.hasMany(Event, {
    foreignKey: "category_id",
    as: "events",
  });

  // User / Event relation
  Event.belongsTo(User, {
    foreignKey: "creator_id",
    as: "creator",
    onDelete: "CASCADE",
  });
  User.hasMany(Event, {
    foreignKey: "creator_id",
    as: "events",
    onDelete: "CASCADE",
  });
};
