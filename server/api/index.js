const express = require("express");

const registerApi = require("./register");
const loginApi = require("./login");
const UsersApi = require("./users");
const StoriesApi = require("./stories");
const ContributionsApi = require("./contributions");
const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(UsersApi);
router.use(StoriesApi);
router.use(ContributionsApi);

router.get("/", function (req, res, next) {
  res.json({ message: "Testing" });
});

module.exports = router;
