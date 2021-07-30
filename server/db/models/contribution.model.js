////////
// Foreign keys: story_id, user_id
//////////////
module.exports = (sequelize, DataTypes) => {
  const Contribution = sequelize.define(
    "contribution",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_accepted: {
        type: DataTypes.STRING,
        defaultValue: "Not reviewed",
      },
      accepted_at: {
        type: DataTypes.DATE,
      },
    },
    {
      updatedAt: false,
    }
  );

  return Contribution;
};
