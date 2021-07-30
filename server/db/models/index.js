const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, DataTypes);
db.stories = require("./story.model.js")(sequelize, DataTypes);
db.contributions = require("./contribution.model.js")(sequelize, DataTypes);
db.upvotes = require("./upvote.model.js")(sequelize, DataTypes);

// Story Associations
db.users.hasMany(db.stories);
db.stories.belongsTo(db.users);
// Contribution Associations
db.stories.hasMany(db.contributions);
db.contributions.belongsTo(db.stories);
db.users.hasMany(db.contributions);
db.contributions.belongsTo(db.users);
// Upvote Associations
db.users.hasMany(db.upvotes);
db.upvotes.belongsTo(db.users);
db.contributions.hasMany(db.upvotes);
db.upvotes.belongsTo(db.contributions);
module.exports = db;
