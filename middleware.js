const { categorySchema, subCategorySchema, itemSchema } = require('./schema.js');
const ExpressError = require('./utils/ExpressError.js');  

const isLoggedIn = function(req, res, next) {
    if(!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
}

const validateCategory = function(req, res, next) {
    const result = categorySchema.validate(req.body);
    if(result.error) {
        const message = result.error.details.map(elem => elem.message).join();
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

const validateSubCategory = function(req, res, next) {
    const result = subCategorySchema.validate(req.body);
    if(result.error) {
        const message = result.error.details.map(elem => elem.message).join();
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}

const validateItem = function(req, res, next) {
    const result = itemSchema.validate(req.body);
    if(result.error) {
        const message = result.error.details.map(elem => elem.message).join();
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}


module.exports = { 
                    isLoggedIn, 
                    validateCategory, 
                    validateSubCategory, 
                    validateItem 
                 }