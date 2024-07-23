import { dbConnect } from "../config/connection.js";
import { User } from '../models/User.js'
import { Activity_Comment } from '../models/Activity_Comment.js'
import { Area } from '../models/Area.js'
import { Climb_Activity } from '../models/Climb_Activity.js'
import { Climb_Comment } from '../models/Climb_Comment.js'
import { Climb } from '../models/Climb.js'
import { Difficulty_YDS } from "../models/Difficulty_YDS.js";
import { Location } from "../models/Location.js";

//force sync of the data model
await dbConnect.sync({ force: true });

//TODO: Add the data import stuff to populate the tables