import Joi from "joi";

import {validateSchema} from '../helpers/validation.helper.js';

export const verifyPurchaseToken = (req, _,next) =>{
    const schema = Joi.object({
        purchaseToken:Joi.string().required(),
        planType: Joi.string().valid('monthly', 'yearly').required(),
        deviceType:Joi.string().valid('android','ios').required(),
        amount: Joi.number().required(),
        subscriptionExpireTime:Joi.date(),
        subscriptionPurchaseTime: Joi.date()
    });

    validateSchema(schema, req.body);
    next();
}; 