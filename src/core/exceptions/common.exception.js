import httpStatus from 'http-status';
import {HttpException} from './http.exception.js';

export class NotFoundException extends HttpException{
    constructor(message){
        super(message);
        this.name = 'NotFoundException';
        this.status = httpStatus.NOT_FOUND;
        this.message = message || 'Not Found';
    }
}

export class TooManyRequestException extends HttpException{
    constructor(message){
        super(message);
        this.name = 'TooManyRequestsException';
        this.status = httpStatus.TOO_MANY_REQUESTS;
        this.message = message || 'Too many Requests';
    }
}

export class ImageIsRequiredException extends HttpException{
    constructor(message){
        this.name = 'ImageIsNullException';
        this.status = httpStatus.BAD_REQUEST;
        this.message = message || 'Too many Requests';   
    }
}

export class InternalServerErrorException extends HttpException{
    constructor(message){
        this.name = 'InternalServerErrorException';
        this.status = httpStatus.INTERNAL_SERVER_ERROR;
        this.message = message || 'Internal server error';   
    }
}