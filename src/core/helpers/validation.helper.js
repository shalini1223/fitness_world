import {validationException} from '../exceptions/validation.exception.js';

/**
 * validate schema
 * @param {Object} schema
 * @param {object} data
 */
export const validateSchema = (schema, data) =>{
    const {error} =schema.validate(data);
    if(error?.details?.length){
        throw new validationException(error.details[0].type, error.details[0].message);
    }
};