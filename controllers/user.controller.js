import express from "express";
import { User as model } from "../models/user.model.js";
import { errorResponse, successResponse } from "../utils/response.utils.js";
import { Authorize, getUserFromToken } from "../utils/auth.utils.js";
import { Event } from "../models/event.model.js";

export const userController = express.Router();
const url = "users";

userController.get(`/${url}`, Authorize, async (req, res) => {
  try {
    const user_id = await getUserFromToken(req, res);

    const result = await model.findOne({
      where: { id: user_id },
      include: [
        {
          model: Event,
          as: "events",
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!result) {
      errorResponse(res, "User not found", 404);
    }
    successResponse(res, result);
  } catch (err) {
    errorResponse(res, `Error fetching user details: ${err.message}`);
  }
});

userController.post(`/${url}`, async (req, res) => {
  try {
    const data = req.body;

    let doesExist = await model.findOne({ where: { email: data.email } });
    if (doesExist) {
      errorResponse(res, "Error User already exists");
    } else {
      const result = await model.create(data);
      successResponse(res, result);
    }
  } catch (err) {
    errorResponse(res, `Error creating user`, err);
  }
});

userController.patch(`/${url}`, Authorize, async (req, res) => {
  try {
    const user_id = await getUserFromToken(req, res);
    const data = req.body;

    const [updated] = await model.update(data, {
      where: { id: user_id },
    });

    if (!updated) {
      errorResponse(res, `No user with the id: ${user_id} found`, 404);
    }
    successResponse(res, { user_id, ...data }, `User info updated`);
  } catch (err) {
    errorResponse(res, `Error updating user`, err);
  }
});

userController.delete(`/${url}`, Authorize, async (req, res) => {
  try {
    const user_id = await getUserFromToken(req, res);

    const result = await model.destroy({
      where: { id: user_id },
    });

    if (!result) {
      errorResponse(res, `No user with the id: ${user_id} found`, 404);
    }

    successResponse(res, `User with the id: ${user_id} deleted successfully`);
  } catch (err) {
    errorResponse(res, `Error deleting user: ${err.message}`);
  }
});
