const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request

  const { username, email, password, avatar } = req.body;

  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    )
  ) {
    return res.status(400).json({
      error:
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.",
    });
  }

  // Create a User
  const user = {
    username: username,
    email: email,
    password: password,
  };

  // // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

//Find a User for login
exports.findOne = async (req, res) => {
  const { username, password } = req.body;

  try {
    User.findOne({
      where: {
        username: username,
      },
    }).then(async (response) => {
      if (!response) {
        res.send("No user found");
      } else {
        if (
          !response.dataValues.password ||
          !(await response.validPassword(
            password,
            response.dataValues.password
          ))
        ) {
          res.send("password incorrect");
        } else {
          const token = jwt.sign(
            { _id: response.dataValues.id },
            process.env.SECRET_TOKEN
          );

          res.header("auth-token", token).json({
            token: token,
            id: response.dataValues.id,
            user: response.dataValues,
          });
        }
      }
    });
  } catch (error) {
    const response = {
      status: 500,
      data: {},
      error: {
        message: "user match failed",
      },
    };
    res.json(response);
  }
};

exports.getUserData = async (req, res) => {
  try {
    User.findOne({
      where: {
        id: req.userId,
      },
    }).then(async (response) => {
      res.json({ user: response });
    });
  } catch (error) {
    const response = {
      status: 500,
      data: {},
      error: {
        message: "user match failed",
      },
    };
    res.json(response);
  }
};
