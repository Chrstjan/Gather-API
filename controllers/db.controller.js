import express from "express";
import sequelize from "../Config/sequelize.config.js";
import { errorResponse, successResponse } from "../utils/response.utils.js";
import { seedFromCsv } from "../utils/seed.utils.js";
import { User } from "../models/user.model.js";
import { Category } from "../models/category.model.js";
import { Event } from "../models/event.model.js";
import { Comment } from "../models/comment.model.js";

export const dbController = express.Router();

dbController.get("/api", async (req, res) => {
  try {
    await sequelize.authenticate();
    successResponse(res, "Connection  to DB");
  } catch (err) {
    errorResponse(res, `Error, could not find DB: ${err.message}`, 500);
  }
});

dbController.get("/sync", async (req, res) => {
  try {
    const resp = await sequelize.sync({ alter: true });
    successResponse(res, "Data successfully synchronized");
  } catch (err) {
    errorResponse(res, `${err.message}`);
  }
});

dbController.get("/seed", async (req, res) => {
  try {
    const files_to_seed = [
      { file: "user.csv", model: User },
      { file: "category.csv", model: Category },
      { file: "event.csv", model: Event },
      { file: "comment.csv", model: Comment },
    ];

    const files_seeded = [];

    await sequelize.sync({ force: true });

    for (let item of files_to_seed) {
      files_seeded.push(await seedFromCsv(item.file, item.model));
    }
    successResponse(res, { "Files seeded": files_seeded }, "Seeding complete");
  } catch (err) {
    errorResponse(res, `Seeding failed!`, err);
  }
});
