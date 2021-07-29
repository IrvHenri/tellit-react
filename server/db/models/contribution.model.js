module.exports = (sequelize, Sequelize) => {
  // Foreign keys: story_id, user_id
  const Contribution = sequelize.define("contribution", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: Sequelize.String,
      allowNull: false,
    },
    is_accepted: {
      type: Sequelize.String,
      defaultValue: "Not reviewed",
    },
    accepted_at: {
      type: Sequelize.Date,
    },
  });

  return Contribution;
};
