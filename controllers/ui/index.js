import { Router } from "express";
const router = Router();
import { Location } from "../../models/Location.js";
import { Area } from "../../models/Area.js";

router.get("/", async (req, res) => {
  res.render("landingPage");
});

router.get("/login", async (req, res) => {
  res.render("login");
});
router.get("/signup", async (req, res) => {
    try{
        let locs = await Location.findAll(
            {order: [['state', 'ASC']]}
        );
        let locations = locs.map(i => i.get({plain: true}))
        console.log(JSON.stringify(locations))
        res.render('signup', {locations})
    }catch(err) {
        console.error(err)
        res.render("error", {error: err})
    }
});
router.get("/area", async (req, res) => {
  let areas;
  try{
    let a = await Area.findAll(
      { include: Location , 
      order: ['name']
      }
    )
    areas = a? a.map(i => i.get({plain: true})) : [];
    res.render('area', {areas})
  }catch(err){
    console.error(err)
    res.render("error", {error: err})
  }
});
router.get("/profile", async (req, res) => {
  res.render("profile");
});
router.get("/search", async (req, res) => {
  res.render("search");
});
router.get("/climb", async (req, res) => {
  res.render("climb");
});

export { router as uiRoutes };
