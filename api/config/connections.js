const initSequilize = require("../models");


exports.connection = (request, response, next) => {
    const { companie } = request.params
    global.connection = global.connection || {}
    
    
    if (!global.connection?.[companie]){
        global.connection[companie] = initSequilize(request, response);
        global.connection[companie].sequelize.sync();
        console.log('registrer')
    }
        
    
    next();
    return global.connection[companie]
    //next(db);
}