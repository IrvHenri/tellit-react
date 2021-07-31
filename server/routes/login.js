module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const users = require("../db/controllers/user.controller");
  router.post("/", users.findOne);
  app.use("/api/login", router);
};
