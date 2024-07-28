import { Router } from "express";
import { User } from "../../../models/User.js";
import { Location } from "../../../models/Location.js";
import {
  responseError,
  responseNotFound,
  responseUnauthorized,
  responseUserError,
} from "../../util.js";
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
  // console.log(location)
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

userRouter.post("/login", async (req, res) => {
  if (!req.body) responseUserError(res, "No body provided");
  let { email, password } = req.body;
  if (!email) responseUserError(res, "No email provided");
  try {
    let u = await User.findOne({
      where: { email: email },
      attributes: ["password", "email"],
    });
    if (!u) {
      responseUnauthorized(res);
      return;
    }
    let isv = await u.isValidPassword(password);
    if (!isv) {
      responseUnauthorized(res);
      return;
    } else {
      req.session.save(() => {
        req.session.isLoggedIn = true;
        res.status(200).json({ message: "login accepted" });
      });
    }
  } catch (err) {
    responseError(res, err);
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

userRouter.post("/logout", async (req, res) => {
  if (req.session && req.session.isLoggedIn) {
    req.session.destroy(() => {
      res.status(204).json();
    });
  } else res.status(404).json();
});
