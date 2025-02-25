import { Types } from 'mongoose';
import joi from 'joi';

export const customId = (value, helper) => {
    let data = Types.ObjectId.isValid(value);
    return data ? value : helper.message("id is not valid");
}

export const generalRules = {
    email: joi.string().email({ tlds: { allow: true }, minDomainSegments: 2, maxDomainSegments: 2 }),
    password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    id: joi.string().custom(customId),
    headers: joi.object({
        authorization: joi.string().required(),
        'cache-control': joi.string(),
        'postman-token': joi.string(),
        'content-type': joi.string(),
        'content-length': joi.string(),
        host: joi.string(),
        'user-agent': joi.string(),
        accept: joi.string(),
        'accept-encoding': joi.string(),
        connection: joi.string()
    }).options({ allowUnknown: true })
};