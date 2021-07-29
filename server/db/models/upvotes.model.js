//user_id foreign key
module.exports = (sequelize, Sequelize) => {
  const Upvote = sequelize.define("upvote", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    // Foreign keys: user_id , contribution_id
  });

  return Upvote;
};
