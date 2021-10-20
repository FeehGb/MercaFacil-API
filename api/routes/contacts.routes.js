const { token: jwt } = require('../token.js');
const { connection } = require('../config/connections')
const token = jwt()

module.exports = api => {
  const contacts = require("../controllers/contacts.controller.js");

  var router = require("express").Router();

  router.post("/:companie/contacts",connection,  token.valid, contacts.create);
  router.get("/:companie/contacts",connection,   contacts.findAll);
  router.get("/:companie/contacts/:id",connection, contacts.findOne);
  router.put("/:companie/contacts/:id",connection,  token.valid, contacts.update);
  router.delete("/:companie/contacts/:id",connection,  token.valid, contacts.delete);
  router.delete("/:companie/contacts",connection,  token.valid, contacts.deleteAll);

  api.use('', router);
};
