import joi from 'joi';  
import { generalRules } from '../../utils/generalRules/index.js';
import { enumGender } from '../../DB/models/user.model.js';
import { roles } from '../../../middleware/auth.js';


export const signUpSchema = {
    body: joi.object({
        name: joi.string().alphanum().min(3).max(50).messages({
            "string.min":"name is short",
            "string.max":"name is long"
        }),
        email: joi.string().email(),
        password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
        cPassword: joi.string().valid(joi.ref("password")),
        gender: joi.string().valid(enumGender.female,enumGender.male,enumGender.Female,enumGender.Male),
        role: joi.string().valid(roles.admin,roles.user),
        phone: joi.string().regex(/^01[0125][0-9]{8}$/),
       
        /**
         *  //object key
        cars:joi.object({
            model:joi.number()
        })
           //array of objects key
        cars:joi.array().items(joi.object({
            model:joi.number()
        }))
           //array of strings key
        cars:joi.array().items(joi.string())
         */
       
    }).options({presence:"required"}).with("password","cPassword") ,
    // headers: generalRules.headers.required()
    // query: joi.object({
    //     flag: joi.number().required(),
    // })  
};
export const updateProfileSchema = {
    body: joi.object({
        name: joi.string().alphanum().min(3).max(20),
        gender: joi.string().valid(enumGender.female, enumGender.male),
        phone: joi.string().regex(/^01[0125][0-9]{8}$/).required()
    }),
    headers:generalRules.headers.required()
};

export const updatePasswordSchema = {
    body: joi.object({
        oldPassword: generalRules.password.required(),
        newPassword: generalRules.password.required(),
        cPassword:generalRules.password.valid(joi.ref("newPassword")).required()
        
    }),
    headers:generalRules.headers.required()
};


export const freezAccountSchema = {
    headers:generalRules.headers.required()
};

export const shareProfileSchema = {
    params: joi.object({
        id: generalRules.id.required()
    }).required()
};












