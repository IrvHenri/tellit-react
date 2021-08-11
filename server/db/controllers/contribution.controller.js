const db = require("../models");
const Story = db.stories;
const Contribution = db.contributions;
const Upvote = db.upvotes;
const Op = db.Sequelize.Op;
exports.countUpvotes = async (req, res) => {
  const { contribution_id } = req.params;

  try {
    let upvotes = await Upvote.count({
      where: [{ contributionId: contribution_id }],
    });
    return res.json({ upvotes });
  } catch (err) {
    return res.status(500).json({ Error: err });
  }
};

exports.upvote = async (req, res) => {
  const { userId } = req.body;

  const { contribution_id } = req.params;
  try {
    let checkExistingVote = await Upvote.findOne({
      where: { userId: userId, contributionId: contribution_id },
    });
    if (checkExistingVote) {
      return res
        .status(400)
        .json({ error: "User has already up-voted this contribution!" });
    } else {
      const upvote = {
        userId: userId,
        contributionId: contribution_id,
      };
      try {
        let newUpvote = await Upvote.create(upvote);
        return res.json({ newUpvote });
      } catch (err) {
        return res.json({ Error: err.message });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.accept = async (req, res) => {
  const { contribution_id } = req.params;
  //check and see if user making post is the author of this story
  const author = await Contribution.findOne({
    where: { id: contribution_id },
    include: [
      {
        model: Story,
        attributes: ["userId"],
      },
    ],
  });
  const authorId = author.story.userId;
  const userId = req.body.user_id;

  // If user is author then update the contribution and set all others to rejected
  if (authorId === userId) {
    try {
      const checkContribution = await Contribution.findOne({
        where: { id: contribution_id },
      });
      const { is_accepted } = checkContribution;
      if (is_accepted === "not reviewed") {
        const accepted = {
          is_accepted: "accepted",
          accepted_at: Date.now(),
        };
        const rejected = {
          is_accepted: "rejected",
        };

        // //Find all and loop through to update all
        Contribution.findAll()
          .then((contributions) => {
            const updatedContributions = contributions.map((contribution) => {
              if (contribution.dataValues.id === Number(contribution_id)) {
                return contribution.update(accepted);
              } else if (
                contribution.dataValues.is_accepted === "not reviewed"
              ) {
                return contribution.update(rejected);
              }
            });
            return Promise.all(updatedContributions);
          })
          .then((data) => res.json({ updatedContributions: data }))
          .catch((err) => res.json({ Error: err.message }));
      }
    } catch (err) {
      return res.status(500).json({ Error: err.message });
    }
  } else {
    return res
      .status(401)
      .json({ Message: "You are not authorized to make this request." });
  }
};
