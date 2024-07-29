import { Router } from "express";
const router = Router();
import { Location } from "../../models/Location.js";
import { Area } from "../../models/Area.js";
import { Climb } from "../../models/Climb.js";
import { Difficulty_YDS } from "../../models/Difficulty_YDS.js"
import { Climb_Comment } from "../../models/Climb_Comment.js"
import { User } from "../../models/User.js"
import { Climb_Activity } from '../../models/Climb_Activity.js'


function getVars(req){
  let {uid, isLoggedIn } = req.session || {uid: "", isLoggedIn: false};
  return {uid, isLoggedIn}
}

router.get("/", async (req, res) => {
  res.render("landingPage", getVars(req));
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/logout", async (req, res) => {
  if (req.session && req.session.isLoggedIn) {
    req.session.destroy();
  }
  res.render("landingPage", getVars(req));
})

router.get("/signup", async (req, res) => {
    try{
        let locs = await Location.findAll(
            {order: [['state', 'ASC']]}
        );
        let locations = locs.map(i => i.get({plain: true}))
        // console.log(JSON.stringify(locations))
        res.render('signup', {locations, ... getVars(req)})
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
    res.render('area', {areas, ...getVars(req)})
  }catch(err){
    console.error(err)
    res.render("error", {error: err})
  }
});
router.get("/profile", async (req, res) => {
  res.render("profile", getVars(req));
});
router.get("/search", async (req, res) => {
  res.render("search", getVars(req));
});
router.get("/climb/:id", async (req, res) => {
  try{
    let cl = await Climb.findOne({
      where: {
        id: req.params.id
      }, 
      include: [Climb_Comment, Difficulty_YDS]
    })
    if(!cl){
      res.render("error", {error: `Unable to find the climb ${req.params.id}`})
      return; 
    }
    let climb = cl.get({plain: true});

    let {uid, isLoggedIn } = req.session;
    res.render("climb", { climb, ...getVars(req) })
  }catch(err){
    console.error(err)
    res.render("error", {error: err})
  }

});

export { router as uiRoutes };
