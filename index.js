const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const cwd = process.cwd();

const PORT = 3001;
const app = express();

const activity = cwd.includes("Social-Network-API")
  ? cwd.split("Insomnia Server Requests")
  : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on Port: ${PORT}`);
  });
});
