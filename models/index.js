const dbConfig = require("../config/sqldb");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
  }
);

sequelize
  .authenticate()
  .then((conn) => {
    console.log("sequil connection");
  })
  .catch((err) => {
    console.log("sequil err", err);
  });

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize
  .sync({ force: false, alter: false })
  .then((conn) => {
    console.log("sync connection");
  })
  .catch((err) => {
    console.log("sync err", err);
  });

db.users = require("./sqlusers")(sequelize, DataTypes);
// db.orders = require("./sqlorders")(sequelize, DataTypes);

db.categories = require("./sqlcategories")(sequelize, DataTypes);
db.customizes = require("./sqlcustomize")(sequelize, DataTypes);
db.products = require("./sqlproducts")(sequelize, DataTypes);
db.reviews = require("./sqlreviews")(sequelize, DataTypes);

db.categories.hasOne(db.products);
db.products.belongsTo(db.categories);

// create foreign key reviewid in products table
db.reviews.hasOne(db.products);
db.products.belongsTo(db.reviews);

// db.users.hasMany(db.orders);
// db.orders.belongsTo(db.users);

module.exports = db;
