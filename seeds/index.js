import { dbConnect } from "../config/connection.js";
import { User } from "../models/User.js";
import { Activity_Comment } from "../models/Activity_Comment.js";
import { Area } from "../models/Area.js";
import { Climb_Activity } from "../models/Climb_Activity.js";
import { Climb_Comment } from "../models/Climb_Comment.js";
import { Climb } from "../models/Climb.js";
import { Difficulty_YDS } from "../models/Difficulty_YDS.js";
import { Location } from "../models/Location.js";
import { readFile } from 'node:fs/promises'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

//force sync of the data model
await dbConnect.sync({ force: true });

//define the relationships
User.belongsToMany(Climb, { through: Climb_Activity });
Climb.belongsToMany(User, { through: Climb_Activity });
User.belongsTo(Location, {  foreignKey: "location_id"});
Location.hasMany(User, { foreignKey: "location_id"});
Location.hasMany(Area, { foreignKey: "location_id"});
Area.belongsTo(Location, { foreignKey: "location_id"});
Area.hasMany(Climb, { foreignKey: "area_id"});
Climb.belongsTo(Area, { foreignKey: "area_id"});
Climb.belongsTo(Difficulty_YDS, { foreignKey: "difficulty_id"});
Difficulty_YDS.hasMany(Climb, { foreignKey: "difficulty_id"});

//populate demo data in the tables

Location.bulkCreate(JSON.parse(await readFile(__dirname + '/location.json')))
Difficulty_YDS.bulkCreate(JSON.parse(await readFile(__dirname + '/difficulty_yds.json')))
Area.bulkCreate(JSON.parse(await readFile(__dirname + '/area.json')))