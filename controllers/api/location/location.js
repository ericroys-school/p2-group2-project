import { Router } from "express";
import { Location } from "../../../models/Location.js";
import { Area } from '../../../models/Area.js'
import { responseError } from "../../util.js";

export const locationRouter = Router();

locationRouter.get('/', async (req, res)=> {

    try{
        let locs = await Location.findAll({
            include: [Area]
        })
        let locations = locs.map(i => i.get({plain: true}))
        res.status(200).json(locations)
    }catch(err){
        console.error(err);
        responseError(res, err);
    }
})

locationRouter.get("/:id", async (req, res) => {
    try {
        let u = await Location.findByPk(req.params.id, {include: Area});
        u ? res.status(200).json(u.get({plain: true})) : responseNotFound(res, req.params.id);
      } catch (err) {
        responseError(res, err);
      }
})