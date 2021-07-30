////////
// Foreign keys: user_id, contribution_id
//////////////
module.exports = (sequelize, DataTypes) => {
  const Upvote = sequelize.define("upvote", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    updatedAt: false,
  });

  return Upvote;
};
