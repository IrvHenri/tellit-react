module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const stories = require("../db/controllers/story.controller");

  // GET Stories
  router.get("/", stories.findAll);

  //Route for Getting both the story, and it's associated contributions
  router.get("/:storyId", stories.findOne);

  //Gets all accepted contributions for story, and ordered by createdAt
  router.get(
    "/:storyId/acceptedContributions",
    stories.findAcceptedContributions
  );

  //Submit New Story
  router.post("/", stories.createStory);

  // Form that submits contribution
  router.post("/:story_id/contribution", stories.createContribution);

  // User marks story complete
  router.post("/:story_id", stories.markStoryComplete);

  app.use("/api/stories", router);
};
