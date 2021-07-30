module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
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
        // Figure out Hashed Password attribute
      },
    },
    {
      updatedAt: false,
    }
  );

  return User;
};

//finish password attribute
