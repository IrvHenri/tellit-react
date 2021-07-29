const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {});

router.get("/:contribution_id/upvotes", (req, res) => {});

//Author Accepts Contribution
router.post("/:contribution_id", (req, res) => {
  //Find Author ID
  //Check if contribution's status is not_reviewed
});

//Upvote Contribution
router.post("/:contribution_id/upvote", (req, res) => {
  //Check if the user upvoting has already upvoted this post
  //If data is undefined, then no upvote exists. Go ahead and add one.
});
module.exports = router;
