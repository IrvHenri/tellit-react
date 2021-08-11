const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const db = require("./db/models");

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});
app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});
require("./routes/signup")(app);
require("./routes/login")(app);
require("./routes/users")(app);
require("./routes/stories")(app);
require("./routes/contributions")(app);

module.exports = app;
