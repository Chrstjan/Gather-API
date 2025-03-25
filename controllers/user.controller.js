import express from "express";
import { User as model } from "../models/user.model.js";
import { errorResponse, successResponse } from "../utils/response.utils.js";
import { Authorize } from "../utils/auth.utils.js";

export const userController = express.Router();
const url = "users";

userController.get(`/${url}`, Authorize, async (req, res) => {
  try {
    const result = await model.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!result || result.length === 0) {
      errorResponse(res, "No users found", 404);
    }
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, `Error fetching users: ${err.message}`);
  }
});
