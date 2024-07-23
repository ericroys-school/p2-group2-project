import { dbConnect } from "../config/connection.js";
import { User } from "../models/User.js";
import { Activity_Comment } from "../models/Activity_Comment.js";
import { Area } from "../models/Area.js";
import { Climb_Activity } from "../models/Climb_Activity.js";
import { Climb_Comment } from "../models/Climb_Comment.js";
import { Climb } from "../models/Climb.js";
import { Difficulty_YDS } from "../models/Difficulty_YDS.js";
import { Location } from "../models/Location.js";

//force sync of the data model
await User.sync({ force: true });
await Climb_Activity.sync({ force: true });
await dbConnect.sync({ force: true });
User.belongsToMany(Climb, { through: Climb_Activity });
Climb.belongsToMany(User, { through: Climb_Activity });
// User.hasOne(Location, {
//   foreignKey: "user_id",
// });

Location.hasMany(User, {
  foreignKey: "location_id",
});

Location.hasMany(Area, {
  foreignKey: "location_id",
});

// Area.belongsTo(Location, {
//   foreignKey: "area_id",
// });

Area.hasMany(Climb, {
  foreignKey: "area_id",
});

// Climb.belongsTo(Area, {
//   foreignKey: "climb_id",
// });

Climb.hasOne(Difficulty_YDS, {
  foreignKey: "climb_id",
});

Difficulty_YDS.hasMany(Climb, {
  foreignKey: "difficulty_id",
});

//TODO: Add the data import stuff to populate the tables
