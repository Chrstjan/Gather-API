import express from "express";
import { Event as model } from "../models/event.model.js";
import { errorResponse, successResponse } from "../utils/response.utils.js";

export const eventController = express.Router();
const url = "events";

eventController.get(`/${url}`, async (req, res) => {
  try {
    const result = await model.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
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
