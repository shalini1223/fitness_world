import {HttpException} from './http.exception.js';
import httpStatus from 'http-status';

export class ValidationException extends HttpException{
    constructor(type, message=''){
        super(message);
        this.name = `joi.${type}`;
        this.status = httpStatus.BAD_REQUEST;
        this.message = message.replace(/\"/g,'') || 'Validation error';
    }
};