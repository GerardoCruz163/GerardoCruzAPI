const Joi = require('joi');

module.exports={
    registroSchema: Joi.object({

        nombre: Joi.string()
        
        .min(3)
        .max(10)
        .required(),

        apellido: Joi.string()
        
        .min(3)
        .max(10)
        .required(),

        acerca_de: Joi.string()
        
        .min(1)
        .max(50)
        .required(),
    }),
};