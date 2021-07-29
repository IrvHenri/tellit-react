const express = require("express");
const router = express.Router();

// GET homepage
router.get("/", (req, res) => {});

//Route for Getting both the story, and it's associated contributions
router.get("/:storyId", (req, res) => {});

//Gets all accepted contributions for story, and orders by c
router.get("/:story_id/acceptedContributions", (req, res) => {});

//Submit New Story
router.post("/", (req, res) => {});

// Form that submits contribution
router.post("/:story_id/contribution", (req, res) => {});

// User marks story complete
router.post("/:story_id", (req, res) => {});
module.exports = router;
