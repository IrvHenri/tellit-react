module.exports = (app) => {
  const express = require("express");
  const router = express.Router();

  router.post("/login", (req, res) => {});
  app.use("/api/login", router);
};
