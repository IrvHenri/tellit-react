const bcrypt = require("bcrypt");

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
        password: {
          allowNull: false,
          type: DataTypes.STRING,
          validate: {
            validatePassword: function (password) {
              if (
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(
                  password
                )
              ) {
                throw new Error(
                  "The password must contain at least 10 and maximum 12 characters including at least 1 uppercase, 1 lowercase, one number and one special character."
                );
              }
            },
          },
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
