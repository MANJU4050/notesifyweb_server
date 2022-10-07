const Joi = require('joi')

//validation function for registration route
const registerValidation = (data) => {

    const schema = Joi.object({
        username: Joi.string().min(4).max(15).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).max(15).required(),
        place: Joi.string().min(6).max(15).required()

    })

    return schema.validate(data);

}

//validation function for login route
const loginValidation = (data) => {

    const schema = Joi.object({

        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(3).max(15).required()

    })

    return schema.validate(data);

}

//validation function for addproducts route
const addProductValidation = (data) => {

    const schema = Joi.object({
      
        productname: Joi.string().required(),
        productprice: Joi.number().required(),
        quantity: Joi.number().required(),
        category: Joi.string().min(3).required(),

    })

    return schema.validate(data);

}

//validation function for updateproducts route
const updateProductValidation = (data) => {

    const schema = Joi.object({
      
        productid: Joi.string().required(),
        productname: Joi.string().required(),
        productprice: Joi.number().required(),
        quantity: Joi.number().required(),
        category: Joi.string().min(3).required(),

    })

    return schema.validate(data);

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.addProductValidation = addProductValidation;
module.exports.updateProductValidation = updateProductValidation;