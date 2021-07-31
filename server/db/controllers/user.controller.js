const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request

  const { username, email, password, avatar } = req.body;
  // if (!username) {
  //   res.status(400).send({
  //     message: "username can not be empty!",
  //   });
  //   return;
  // }

  // if (!email) {
  //   res.status(400).send({
  //     message: "email can not be empty!",
  //   });
  //   return;
  // }
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
    password: password,
    avatar: avatar ? avatar : null,
  };

  // // Save Tutorial in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};
