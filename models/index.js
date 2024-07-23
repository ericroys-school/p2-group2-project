import { dbConnect } from "../config/connection.js";
import { User } from '../models/User.js'
import { Activity_Comment } from '../models/Activity_Comment.js'
import { Area } from '../models/Area.js'
import { Climb_Activity } from '../models/Climb_Activity.js'
import { Climb_Comment } from '../models/Climb_Comment.js'
import { Climb } from '../models/Climb.js'
import { Difficulty_YDS } from "../models/Difficulty_YDS.js";
import { Location } from "../models/Location.js";

User.hasMany (Climb_Activity, {
    foreignKey: 'user_id'
});

Climb_Activity.belongsTo (User,{
    foreignKey: 'user_id'
});

User.hasOne (Location, {
    foreignKey: 'user_id'
});

Location.belongsTo (User,{
    foreignKey: 'user_id'
});

User.hasMany (Climb_Comment, {
    foreignKey: 'user_id'
});

Climb_Comment.belongsTo (User,{
    foreignKey: 'user_id'
});

Location.hasMany (Area, {
    foreignKey: 'location_id'
});

Area.belongsTo (Location,{
    foreignKey: 'id'
});

Area.hasMany (Climb, {
    foreignKey: 'area_id'
});

Climb.belongsTo (Area,{
    foreignKey: 'id'
});

Climb_Activity.hasMany (Activity_Comment, {
    foreignKey: 'activity_id'
});

Activity_Comment.belongsTo (Climb_Activity,{
    foreignKey: 'id'
});

Climb.hasMany (Climb_Activity, {
    foreignKey: 'climb_id'
});

Climb_Activity.belongsTo (Climb,{
    foreignKey: 'id'
});

Climb.hasOne (Difficulty_YDS, {
    foreignKey: 'id'
});

Difficulty_YDS.belongsTo (Climb,{
    foreignKey: 'difficulty_id'
});

Climb.hasMany (Climb_Comment, {
    foreignKey: 'climb_id'
});

Climb_Comment.belongsTo (Climb,{
    foreignKey: 'id'
});

Difficulty_YDS.hasMany (Climb, {
    foreignKey: 'difficulty_id'
});

Climb.belongsTo (Difficulty_YDS,{
    foreignKey: 'id'
});


export {
    User,
    Activity_Comment,
    Area,
    Climb_Comment,
    Climb_Activity,
    Climb,
    Difficulty_YDS,
    Location
};