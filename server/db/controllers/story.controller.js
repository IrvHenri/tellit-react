const db = require("../models");
const Story = db.stories;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request

  const { title, initial_Content, userId } = req.body;

  // Create a User
  const story = {
    title,
    initial_Content,
    userId,
  };

  // // Save Tutorial in the database
  Story.create(story)
    .then((data) => {
      console.log("Created Story:", data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Story.",
      });
    });
};
