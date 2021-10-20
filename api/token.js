
var jwt = require('jsonwebtoken');
const utils = require('./utils')


exports.token = () => {
    const env = require('dotenv').config().parsed

    function create(data, companie) {
        try {
            return jwt.sign({ data }, `${env["SECRET"]}-${companie}`, {
                expiresIn: '1h'
            })

        } catch (error) {
            console.log(error)
            return false
        }
    }

    /**
     * @description Middlewhere para validaçao de rota
     */
    function valid(request, response, next) {
        
        const { authorization } = request.headers
        
        try {
            const [_, token] = authorization?.split('Bearer ') || []
            const { companie } = request.params
            console.log(`${env["SECRET"]}-${companie}`)
            jwt.verify(token, `${env["SECRET"]}-${companie}`);
            next()
        } catch (error) {
            
            utils.sendResponse(response, {status:401, json:{error: 'Sem permisão de acesso'}})
            return false
        }
    }


    return { create, valid }

}