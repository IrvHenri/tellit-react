const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request

  const { username, email, password, avatar } = req.body;
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(
      password
    )
  ) {
    return res
      .status(400)
      .send(
        "The password must contain at least 10 and maximum 12 characters including at least 1 uppercase, 1 lowercase, one number and one special character."
      );
  }

  // Create a User
  const user = {
    username: username,
    email: email,
    password: password ? password : null,
    avatar: avatar ? avatar : null,
  };

  // // Save User in the database
  User.create(user)
    .then((data) => {
      console.log("CreatedUser:", data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

//Find a User for login
exports.findOne = async (req, res) => {
  const { username, password } = req.body;
  console.log(password, username);

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
          res.send("logged in");
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
