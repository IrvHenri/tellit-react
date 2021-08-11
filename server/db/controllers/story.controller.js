const db = require("../models");
const Story = db.stories;
const User = db.users;
const Contribution = db.contributions;
const Op = db.Sequelize.Op;

//Get all Stories
exports.findAll = (req, res) => {
  Story.findAll({
    order: [["id", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["avatar", "username"],
      },
    ],
  }).then((stories) => {
    console.log(`Found ${stories.length} stories.`);
    res.json({ stories });
  });
};

// Find Single Story
exports.findOne = async (req, res) => {
  const id = req.params.storyId;
  const StoryData = await Story.findOne({
    where: { id: id },
    include: [
      {
        model: User,
        attributes: ["avatar", "username"],
      },
    ],
  });

  const contributionData = await Contribution.findAll({
    order: [["id", "DESC"]],
    where: { storyId: id, is_accepted: { [Op.like]: "not reviewed" } },
    include: [
      {
        model: User,
        attributes: ["avatar", "username"],
      },
    ],
  });
  return res.json({ story: StoryData, contributions: contributionData });
};

// Get All Users stories
exports.findUserStories = (req, res) => {
  const { id } = req.params;

  Story.findAll({
    where: { userId: id },
    include: [
      {
        model: User,
        attributes: ["avatar", "username"],
      },
    ],
  }).then((stories) => {
    console.log(`Found ${stories.length} stories.`);
    res.json({ stories });
  });
};

// Create and Save a new Story
exports.createStory = (req, res) => {
  const { title, initial_content, userId } = req.body;
  console.log("FORM DATA --------->>>>", title, initial_content, userId);
  // Create a Story
  const story = {
    title,
    initial_content,
    userId,
  };

  // // Save Story in the database
  Story.create(story)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Story.",
      });
    });
};

exports.markStoryComplete = (req, res) => {
  const { userId, storyId } = req.body;
  const newData = {
    is_complete: true,
  };

  Story.update(newData, { where: { id: storyId, userId: userId } })
    .then((updatedStory) => {
      console.log(updatedStory);
      return res.json({ message: "Story is complete!" });
    })
    .catch((err) => res.json({ Error: "Oops! Something went wrong!" }));
};

exports.createContribution = (req, res) => {
  const { content, storyId, userId } = req.body;

  // Create a Contribution
  const contribution = {
    content,
    storyId,
    userId,
  };

  // // Save Contribution in the database
  Contribution.create(contribution)
    .then((data) => {
      res.json({ contribution: data });
    })
    .catch((err) => {
      res.status(500).json({
        Error:
          err.message || "Some error occurred while creating the Contribution.",
      });
    });
};

exports.findAcceptedContributions = async (req, res) => {
  const id = req.params.storyId;
  try {
    const contributionData = await Contribution.findAll({
      where: { storyId: id, is_accepted: { [Op.like]: "accepted" } },
    });
    return res.json({ acceptedContributions: contributionData });
  } catch (err) {
    return res.json({ Error: err });
  }
};
