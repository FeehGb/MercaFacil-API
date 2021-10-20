
const utils = require('../utils');




exports.create = (request, response) => {

  const { companie } = request.params
  const Contacts = global.connection[companie].contacts;
  
  let { nome, celular, contacts: contactsList } = request.body
  
  if (contactsList){
    
    Contacts.bulkCreate(contactsList)
      .then(data => {
        utils.sendResponse(response, { status: 201, json: { contacts: data} })

      })
      .catch(err => {
        utils.sendResponse(response, { status: 500, json: { error: err?.message || "Houve algun erro na criacao do contato" } })
      });
    
    
    return 
  }
  
  if (!nome) {
    utils.sendResponse(response, { status: 400, json: { error: "Faltando parametros!" } })
    return;
  }

  const contacts = {
    nome,
    celular
  };
  Contacts.create(contacts)
    .then(data => {
      utils.sendResponse(response, { status: 201, json: data })
      
    })
    .catch(err => {
      
      utils.sendResponse(response, { status: 500, json: { error: err?.message || "Houve algun erro na criacao do contato" } })
      
    });
};


exports.findAll = (request, response) => {
  const { companie } = request.params
  const Contacts = global.connection[companie].contacts;
  const Op = global.connection[companie].Sequelize.Op;
  const { nome } = request.query;
  
  var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

  Contacts.findAll({ where: condition })
    .then(data => {
      utils.sendResponse(response, { status: 200, json: { contacts: data } })
      
    })
    .catch(err => {
      utils.sendResponse(response, { status: 500, json: { error: err?.message || "Houve algum na busca" } })
      
    });
};


exports.findOne = (request, response) => {
  const { companie, id } = request.params
  const Contacts = global.connection[companie].contacts;
  
  Contacts.findByPk(id)
    .then(data => {
      if (data) {
        utils.sendResponse(response, { status: 200, json: data })
        //response.send(data);
      } else {
        utils.sendResponse(response, { status: 404, json: { error: `Não foi possivel encontrar contatto id= ${id}` } })
      }
    })
    .catch(err => {
      utils.sendResponse(response, { status: 500, json: { error: err?.message || `Houve algum na busca id=${id}` } })
      
    });
};


exports.update = (request, response) => {
  const { companie } = request.params
  const Contacts = global.connection[companie].contacts;
  const {id} = request.params;

  Contacts.update(request.body, {
    where: { id }
  })
    .then(num => {
      if (num == 1) {
        utils.sendResponse(response, { status: 200, json: { message: "Contacts Foi atualizado com sucesso!" } })
      } else {
        utils.sendResponse(response, { status: 400, json: { error: `Não foi possivel atualizar o contato, Não encontrado ou contato nao existe!` } })
      }
    })
    .catch(err => {
      utils.sendResponse(response, { status: 500, json: { error: `Ocorreu um erro na tentativa de atualizacao` } })
    });
};

exports.delete = (request, response) => {
  const { companie, id } = request.params
  const Contacts = global.connection[companie].contacts;


  Contacts.destroy({
    where: { id }
  })
    .then(num => {
      if (num == 1) {
        utils.sendResponse(response, { status: 200, json: { message: `Contato deletado com sucesso` } })
        
      } else {
        utils.sendResponse(response, { status: 400, json: { error: `Não foi possivel deletar o contato` } })
        
      }
    })
    .catch(err => {
      utils.sendResponse(response, { status: 500, json: { error: `Houve algum erro ao tentar deletar contato` } })
      
    });
};


exports.deleteAll = (request, response) => {
  const { companie } = request.params
  const Contacts = global.connection[companie].contacts;
  
  Contacts.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      utils.sendResponse(response, { status: 200, json: { message: `Todos os contatos foram deletado com sucesso` } })
      
    })
    .catch(err => {
      utils.sendResponse(response, { status: 500, json: { error: err?.message || "Um erro ocorreu na tentantiva de deletar todos os clientes" } })
      
    });
};
