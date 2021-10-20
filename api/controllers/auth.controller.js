const utils = require('../utils')

const { token:jwt } = require('../token.js');
const token = jwt()


/**
 *  @description funcao de manipulacao de token
*/
exports.create = (request, response) => {

    const { login, pass } = request.body
    const { companie } = request.params

    
    console.log(login, pass, companie);
    
    if (!(companie && login && pass)) {
        utils.sendResponse(response, { status: 401, json: { error: "Nao autorizado, faltando parametros." } })
        return;
    }

    const companieUsers = {
        macapa: [
            { login: 'macapa', pass: '1234' }
        ],
        varejao: [
            { login: 'varejao', pass: '1234' }
        ]
    }

    const selectedCompanie = companieUsers[companie];
    const user = selectedCompanie.find(companie => companie.login === login && companie.pass === pass);

    if (!user) {
        utils.sendResponse(response, { status: 401, json: { error: "Usuario ou senha invalidos" } })
        return;
    }
    
    
    
    data = token.create(user, companie);
    utils.sendResponse(response, { status: 201, json: { token: data } });
    return;

}