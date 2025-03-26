import express from "express";
import { Event as model } from "../models/event.model.js";
import { errorResponse, successResponse } from "../utils/response.utils.js";
import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";

export const eventController = express.Router();
const url = "events";

eventController.get(`/${url}`, async (req, res) => {
  try {
    const result = await model.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
        {
          model: User,
          as: "creator",
          attributes: ["firstname", "lastname"],
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "creator_id",
          "user_id",
          "category_id",
        ],
      },
    });

    if (!result || result.length === 0) {
      errorResponse(res, "No events found", 404);
    }
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, `Error fetching events: ${err.message}`);
  }
});

eventController.get(`/${url}/:id([0-9]+)`, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await model.findOne({
      where: { id: id },

      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
        {
          model: User,
          as: "creator",
          attributes: ["firstname", "lastname", "username"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "subject", "content"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "username"],
            },
          ],
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "creator_id",
          "user_id",
          "category_id",
        ],
      },
    });

    if (!result || result.length === 0) {
      errorResponse(res, `Event with id: ${id} not found`, 404);
    }
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, `Error fetching event: ${err.message}`);
  }
});
