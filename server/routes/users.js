module.exports = (app) => {
  const express = require("express");
  const router = express.Router();

  router.get("/:id/stories", (req, res) => {});
  app.use("/api/users", router);
};
