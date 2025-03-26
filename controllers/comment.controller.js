import express from "express";
import { Comment as model } from "../models/comment.model.js";
import { errorResponse, successResponse } from "../utils/response.utils.js";
import { User } from "../models/user.model.js";

export const commentController = express.Router();
const url = "comments";

commentController.get(`/${url}/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const eventId = parseInt(id);

    const result = await model.findAll({
      where: { event_id: eventId },
      include: {
        model: User,
        as: "user",
        attributes: ["id", "firstname", "lastname", "username"],
      },
    });

    if (!result || result.length === 0) {
      errorResponse(
        res,
        `No comments found for the event with the id: ${eventId}`,
        404
      );
    }
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, `Error fetching comments: ${err.message}`);
  }
});
