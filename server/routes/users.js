module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const validateToken = require("./validateToken");
  const stories = require("../db/controllers/story.controller");
  const users = require("../db/controllers/user.controller");
  router.get("/:id/stories", validateToken, stories.findUserStories);
  router.get("/data", validateToken, users.getUserData);
  app.use("/api/users", router);
};
