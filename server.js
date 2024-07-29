import express from "express";
import Session from 'express-session'

import SequelizeStore from 'connect-session-sequelize';
const store = SequelizeStore(Session.Store);


import { router } from "./controllers/index.js";
import { dbConnect } from "./config/connection.js";
import { create } from "express-handlebars";
import path from "node:path";
import { fileURLToPath } from "node:url";
/*
  a work-around to sequelize not syncing relationships
  (would sync models)
*/
import { sequelize_sux } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3001;
const dir = path.dirname(fileURLToPath(import.meta.url));
const sessionStore = {
  secret: 'blah',
  cookie: {
    //four hour expire
    maxAge: 4 * 60 * 60 * 1000, 
  },
  resave: false,
  saveUninitialized: true,
  store: new store({
    db: dbConnect,
  }),
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Session(sessionStore));
app.engine("handlebars", create({}).engine);
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(router);

// sync sequelize models to the database, then turn on the server
dbConnect.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
