


module.exports = (sequelize, Sequelize, companie) => {
  let Contacts = null
  switch (companie) {
    case "varejao":
      Contacts = sequelize.define("contacts", {
        nome: {
          type: Sequelize.STRING(100),
          
        },
        celular: {
          type: Sequelize.STRING(13),
          validate: {
            is: {
              args: /^\d+$/i,
              msg: "So serao aceitos numeros"
            }
          }
        }
      });
      break;
    case "macapa":
      Contacts = sequelize.define("contacts", {
        nome: {
          type: Sequelize.STRING(200),
          validate:{
            is: {
              args: /^[A-Z\s]*$/i,
              msg: "So serão aceitos nomes com letras maisculas"
            }
            
          } 
        },
        celular: {
          type: Sequelize.STRING(20),
          validate: {
            is: {
              args: /^\+55\s\(\d{2}\)\s\d{4,5}\-\d{4}$/i,
              msg: "O numero do celular deve estar no formato +55 (xx) xxxxx-xxxx"
            }
          }
        }
      });
      break;
  
    default:
      break;
  }
  
  
  

  return Contacts;
};
