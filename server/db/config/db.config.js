require("dotenv").config();
module.exports = {
  HOST: "localhost",
  USER: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE,
  dialect: "postgres",
};
