//user_id foreign key
module.exports = (sequelize, Sequelize) => {
  const Story = sequelize.define("story", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.String,
      allowNull: false,
    },
    initial_Content: {
      type: Sequelize.String,
      allowNull: false,
    },
    is_complete: {
      type: Sequelize.Boolean,
      defaultValue: false,
    },
  });

  return Story;
};
