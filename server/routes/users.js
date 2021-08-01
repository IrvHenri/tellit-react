module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const stories = require("../db/controllers/story.controller");
  router.get("/:id/stories", stories.findUserStories);
  app.use("/api/users", router);
};
