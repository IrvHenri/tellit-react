const express = require("express");

const registerApi = require("./register");
const loginApi = require("./login");
const UsersApi = require("./users");
const StoriesApi = require("./stories");
const ContributionsApi = require("./contributions");
const router = express.Router();

// router.use(registerApi);
// router.use(loginApi);
router.use("/users", UsersApi);
router.use("/stories", StoriesApi);
router.use("/contributions", ContributionsApi);

router.get("/", function (req, res, next) {
  res.json({ stories: "Testing" });
});

module.exports = router;
