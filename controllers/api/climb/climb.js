import { Router } from "express";
import { Climb } from "../../../models/Climb.js";
import { Climb_Comment } from '../../../models/Climb_Comment.js'
import { responseError } from "../../util.js";
export const climbRouter = Router();

climbRouter.get("/:id", async (req, res) => {
    try {
        let u = await Climb.findByPk(req.params.id, {include: [Climb_Comment]});
        u ? res.status(200).json(u) : responseNotFound(res, req.params.id);
      } catch (err) {
        responseError(res, err);
      }
})