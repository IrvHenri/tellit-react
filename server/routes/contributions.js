module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const contributions = require("../db/controllers/contribution.controller");

  // I don't think I need this route
  // router.get("/", (req, res) => {});

  router.get("/:contribution_id/upvotes", contributions.countUpvotes);

  //Author Accepts Contribution
  router.post("/:contribution_id", contributions.accept);

  //Upvote Contribution
  router.post("/:contribution_id/upvote", contributions.upvote);
  app.use("/api/contributions", router);
};
