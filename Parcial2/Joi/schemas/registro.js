const Joi = require('joi');

module.exports={
    registroSchema: Joi.object({

        nombre: Joi.string()
        .alphanum()
        .min(3)
        .max(10)
        .required(),

        apellido: Joi.string()
        .alphanum()
        .min(3)
        .max(10)
        .required(),

        acerca_de: Joi.string()
        .alphanum()
        .min(1)
        .max(50)
        .required(),
    }),
};