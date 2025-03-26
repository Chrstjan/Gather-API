import { Category } from "./category.model.js";
import { Comment } from "./comment.model.js";
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
    foreignKey: "user_id",
    as: "creator",
    onDelete: "CASCADE",
  });
  User.hasMany(Event, {
    foreignKey: "creator_id",
    as: "events",
    onDelete: "CASCADE",
  });
};

// Comment / User relation
Comment.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});
User.hasMany(Comment, {
  foreignKey: "user_id",
  as: "comments",
  onDelete: "CASCADE",
});

// Comment / Event relation
Comment.belongsTo(Event, {
  foreignKey: "event_id",
  as: "event",
  onDelete: "CASCADE",
});
Event.hasMany(Comment, {
  foreignKey: "event_id",
  as: "comments",
  onDelete: "CASCADE",
});
