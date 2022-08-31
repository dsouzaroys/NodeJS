
const joi = require('joi');

const registerValidation = (data)=>{
    const registerObject = {
        userName: joi.string().min(6).max(50).required(),
        email:joi.string().required().email(),
        password:joi.string().min(6).max(12).required()
        }
     registerSchema= joi.object(registerObject);
     return registerSchema.validate(data)
}

const loginVlidation = (data)=>{
    const loginObject = {
        email:joi.string().required().email(),
        password:joi.string().min(6).max(12).required()
    }
    loginSchema = joi.object(loginObject)
    return loginSchema. validate(data);
}

module.exports= {
    registerValidation,
    loginVlidation
}