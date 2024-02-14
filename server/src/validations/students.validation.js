import Joi from 'joi';

export function studentsValidation(payload) {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        grade: Joi.number().min(2).required(),
        major: Joi.string().min(12).required(),
        school: Joi.string().min(12).required()
    });

    return schema.validate(payload);
}
