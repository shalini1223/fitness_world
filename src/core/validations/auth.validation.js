import Joi from 'joi';

import {validateSchema} from '../helpers/validation.helper.js';

export const registerAndLogin =(req,_,next) =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        fcmToken: Joi.string(),
        timeZone: Joi.string()
    });

    validateSchema(schema, req.body);
    next();
};
