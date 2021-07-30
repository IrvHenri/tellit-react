////////
// Foreign keys: user_id
//////////////

module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define(
    "story",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      initial_Content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      updatedAt: false,
    }
  );

  return Story;
};
