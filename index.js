import express from "express";
import dotenv from "dotenv";
import { dbController } from "./controllers/db.controller.js";
import { authController } from "./controllers/auth.controller.js";
import { setRelations } from "./models/relations.js";
import { categoryController } from "./controllers/category.controller.js";
import { userController } from "./controllers/user.controller.js";
import { eventController } from "./controllers/event.controller.js";
import { commentController } from "./controllers/comment.controller.js";

const app = express();

dotenv.config();

const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

setRelations();

app.get("/", (req, res) => {
  res.send("Welcome to the Gather API");
});

app.use(
  dbController,
  authController,
  userController,
  categoryController,
  eventController,
  commentController
);

app.listen(port, () => {
  console.log(`Server live on http://localhost:${port}`);
});
