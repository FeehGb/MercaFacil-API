const express = require("express");
const api = express();

function init() {
  
  api.use(express.json());
  api.use(express.urlencoded({ extended: true }));
  
  api.get("/", (req, res) => {
    res.json({ message: "API ONLINE" });
  });


  require("./api/routes/auth.routes")(api);
  require("./api/routes/contacts.routes")(api);


  const PORT = process.env.PORT || 3000;
  api.listen(PORT, () => {
    console.log(`Iniciando servidor na Porta:${PORT}.`);
  });

  
}

init();
