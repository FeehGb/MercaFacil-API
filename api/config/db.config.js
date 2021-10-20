module.exports = {
  "macapa":{
    HOST: "localhost",
    USER: "root",
    PASSWORD: "cedros",
    DB: "admin",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
    
  },
  "varejao":{
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "cedros",
    DB: "admin",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
