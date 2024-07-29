import { Router } from "express";
import {Climb_Comment } from "../../../models/Climb_Comment";
import { responseError, responseUnauthorized, responseUserError } from "../../util.js";
export const climbComm = Router();

climbComm.post("/:climbid", async (req, res) => {
    if (!req.session || !req.session.isLoggedIn || !req.session.uid) {
      responseUnauthorized(res);
      return;
    }
    if (!req.body) responseUserError(res, "No body provided");
    let { text } = req.body;
    try {
        let t = text && text.length > 255 ? text.substr(0, 255) : text
        let a = await Climb_Comment.create({
          climb_id: req.params.climbid,
          user_id: req.session.uid,
          text: t
        });
        res.status(201).json(a.get({ plain: true }));

    } catch (err) {
      console.error(err);
      responseError(res, err);
    }
  });
  