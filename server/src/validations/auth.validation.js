import Joi from 'joi';

export function registerValidation(payload) {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(payload);
}

export function loginValidation(payload) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(payload);
}
