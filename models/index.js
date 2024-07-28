
import { User } from "../models/User.js";
import { Activity_Comment } from "../models/Activity_Comment.js";
import { Area } from "../models/Area.js";
import { Climb_Activity } from "../models/Climb_Activity.js";
import { Climb_Comment } from "../models/Climb_Comment.js";
import { Climb } from "../models/Climb.js";
import { Difficulty_YDS } from "../models/Difficulty_YDS.js";
import { Location } from "../models/Location.js";

const userclimb = User.belongsToMany(Climb, { through: Climb_Activity });
const climbuser = Climb.belongsToMany(User, { through: Climb_Activity });
const climbdiff = Climb.belongsTo(Difficulty_YDS, {
  foreignKey: "difficulty_id",
});
const diffclimb = Difficulty_YDS.hasMany(Climb, {
  foreignKey: "difficulty_id",
});
const areaclimb = Area.hasMany(Climb, { foreignKey: "area_id" });
const climbarea = Climb.belongsTo(Area, { foreignKey: "area_id" });
const userloc = User.belongsTo(Location, { foreignKey: "location_id" });
const locuser = Location.hasMany(User, { foreignKey: "location_id" });
const locarea = Location.hasMany(Area, { foreignKey: "location_id" });
const arealoc = Area.belongsTo(Location, { foreignKey: "location_id" });
const climbcomm = Climb.hasMany(Climb_Comment, { foreignKey: "climb_id" });
const commclimb = Climb_Comment.belongsTo(Climb, { foreignKey: "climb_id" });
const useractcomm = User.hasMany(Activity_Comment, { foreignKey: "user_id" });
const commactuser = Activity_Comment.belongsTo(User, { foreignKey: "user_id" });
const userclimbcomm = User.hasMany(Climb_Comment, { foreignKey: "user_id" });
const climbcommuser = Climb_Comment.belongsTo(User, { foreignKey: "user_id" });
const sequelize_sux = true;
export {
  User,
  Activity_Comment,
  Area,
  Climb_Comment,
  Climb_Activity,
  Climb,
  Difficulty_YDS,
  Location,
  userclimb,
  climbuser,
  climbdiff,
  diffclimb,
  areaclimb,
  climbarea,
  userloc,
  locuser,
  locarea,
  arealoc,
  climbcomm,
  commclimb,
  useractcomm,
  commactuser,
  userclimbcomm,
  climbcommuser,
  sequelize_sux
};
