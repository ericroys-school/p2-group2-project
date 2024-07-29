import { Router } from "express";
const router = Router();
import { Location } from "../../models/Location.js";
import { Area } from "../../models/Area.js";
import { User } from "../../models/User.js";

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
  if(req.session && req.session.isLoggedIn && req.session.uid){
    console.log('whats up');
    try{
      let user = await User.findByPK(id);
      res.render("profile", {user});
  }catch(err) {
      console.error(err)
      res.render("error", {error: err})
  }} else {
    console.log('Hello');
    res.render("login");
  } 
});
router.get("/search", async (req, res) => {
  res.render("search");
});
router.get("/climb", async (req, res) => {
  res.render("climb");
});

export { router as uiRoutes };
