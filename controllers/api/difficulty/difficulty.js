import { Router } from "express";
import { Difficulty_YDS } from "../../../models/Difficulty_YDS.js";
export const difficultyRouter = Router();

difficultyRouter.get("/", async (req, res) => {
  try {
    let diffs = await Difficulty_YDS
      .findAll
      //this doesn't work because of decimal
      //{order: [['name', 'ASC']]}
      ();
    let x = diffs.map((i) => i.get({ plain: true }));

    res.status(200).json(x);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
