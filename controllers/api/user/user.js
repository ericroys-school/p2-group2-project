import { Router } from "express";
import { User } from "../../../models/User.js";
import { Location } from "../../../models/Location.js";
import { responseError, responseNotFound, responseUserError } from "../../util.js";
export const userRouter = Router();

/**
 * Create a new user
 */
userRouter.post("/", async (req, res) => {
  if (!req.body) responseUserError(res, "No body provided");
  let { firstName, lastName, email, password, location } = req.body;

  if (location) {
    let s = await Location.findOne({
      where: { state: location },
      attributes: ["id"],
    });
    location = s ? s.get({ plain: true }).id : "null";

  }

  try {
    const u = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      location_id: location,
    });
    res.status(201).json(u);
  } catch (err) {
    console.error(err);
    err.errors && err.errors.length > 0
      ? responseUserError(res, err.errors[0].message)
      : responseError(res, err);
  }
});

/**
 * Get a user by primary key id
 */
userRouter.get("/:id", async (req, res) => {
  try {
    let u = await User.findByPk(req.params.id);
    u ? res.status(200).json(u) : responseNotFound(res, req.params.id);
  } catch (err) {
    responseError(res, err);
  }
});
