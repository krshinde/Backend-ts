import Joi from "joi";


export const userSignUpSchema = Joi.object({
    full_name:Joi.string().min(2).max(30).required(),
    user_name:Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).strict().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict(),
    country_code:Joi.string().min(3).required(),
    phone_number:Joi.number().min(10).required(),
    device_token: [Joi.string(),Joi.number()],
})

export const userLoginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required(),
    password: Joi.string().min(7).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).strict().required()
})