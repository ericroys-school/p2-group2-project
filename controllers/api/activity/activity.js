import { Router } from "express";
import { Climb_Activity } from "../../../models/Climb_Activity.js";
import { responseError, responseUnauthorized } from "../../util.js";

export const activeRoute = Router();

activeRoute.post("/:climbid", async (req, res) => {
  if (!req.session || !req.session.isLoggedIn || !req.session.uid) {
    responseUnauthorized(res);
    return;
  }
  try {
    let there = await Climb_Activity.findOne({
      where: {
        climb_id: req.params.climbid,
        user_id: req.session.uid,
      },
      attributes: ["id"],
    });
    if (there) {
      res.status(201).json(there.get({ plain: true }));
      return;
    } else {
      let a = await Climb_Activity.create({
        climb_id: req.params.climbid,
        user_id: req.session.uid,
      });
      res.status(201).json(a.get({ plain: true }));
    }
  } catch (err) {
    console.error(err);
    responseError(res, err);
  }
});
