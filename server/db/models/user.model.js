module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: Sequelize.String,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: Sequelize.String,
      defaultValue:
        "https://cdn2.vectorstock.com/i/thumb-large/59/16/cartoon-animal-head-icon-mouse-face-avatar-vector-7375916.jpg",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
  });

  return User;
};

//finish password attribute
