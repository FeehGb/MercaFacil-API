var router = require("express").Router();

module.exports = api => {
    const auth = require("../controllers/auth.controller.js");
    router.post("/:companie/auth", auth.create);
    api.use('/', router);
};
