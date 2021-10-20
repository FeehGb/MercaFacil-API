const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");



function initSequilize(request, response) {
  
  const { companie } = request.params
  
  const sequelize = new Sequelize(dbConfig[companie].DB, dbConfig[companie].USER, dbConfig[companie].PASSWORD, {
    host: dbConfig[companie].HOST,
    dialect: dbConfig[companie].dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig[companie].pool.max,
      min: dbConfig[companie].pool.min,
      acquire: dbConfig[companie].pool.acquire,
      idle: dbConfig[companie].pool.idle
    }
  });

  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.contacts = require("./contacts.model.js")(sequelize, Sequelize, companie);
  
  return db
  
}
module.exports = initSequilize;
