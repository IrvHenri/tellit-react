const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const passwordValidator = require("password-validator");
const schema = new passwordValidator();
schema.is().min(8).has().uppercase().has().lowercase().has().symbols();
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request

  const { username, email, password, avatar } = req.body;

  if (!schema.validate(password)) {
    return res.status(400).json({
      message:
        "Password must be atleast 8 characters long with  one uppercase letter, one lowercase letter, one number and one special character.",
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
        message:
          err.errors[0].message ||
          "Some error occurred while creating the User.",
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
        res.status(404).send("No user found");
      } else {
        if (
          !response.dataValues.password ||
          !(await response.validPassword(
            password,
            response.dataValues.password
          ))
        ) {
          res.status(403).send("Username or password incorrect.");
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
