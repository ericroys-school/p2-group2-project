import express from "express";
import { apiRoutes } from "./controllers/api/index.js";
import { dbConnect } from "./config/connection.js";
import { create } from "express-handlebars";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT || 3001;
const dir = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiRoutes);
app.engine("handlebars", create({}).engine);
app.set("view engine", "handlebars");
app.use(express.static("public"));

//serve the start page
app.get("/", (req, res) => res.sendFile(path.join(dir, "/public/index.html")));

// sync sequelize models to the database, then turn on the server
dbConnect.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
