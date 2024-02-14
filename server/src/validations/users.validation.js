import Joi from 'joi';

export function usersValidation(payload) {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        refreshToken: Joi.string()
    });

    return schema.validate(payload);
}
