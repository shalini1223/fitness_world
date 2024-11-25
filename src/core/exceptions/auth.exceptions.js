import {HttpException} from './http.exception.js';
import httpStatus from 'http-status';

export class InvalidRequestException extends HttpException{
    constructor(message){
        super(message);
        this.name = 'InvalidRequestException';
        this.status = httpStatus.BAD_REQUEST;
        this.message = message || 'Invalid request';
    }
}

export class InvalidPasswordException extends HttpException{
    constructor(message){
        super(message);
        this.name = 'InvalidPasswordException';
        this.status = httpStatus.BAD_REQUEST;
        this.message = message || 'Invalid Password';
    }
}

export class InvalidOldPasswordException extends HttpException{
    constructor(message){
        super(message);
        this.name = 'InvalidOldPasswordException';
        this.status = httpStatus.BAD_REQUEST;
        this.message = message || 'Old Password is incorrect';
    }
}

export class InvalidTokenException extends HttpException{
    constructor(message){
        super(message);
        this.name = 'InvalidTokenException';
        this.status = httpStatus.BAD_REQUEST;
        this.message = message || 'Invalid token';
    }
}

export class UserExistsException extends HttpException{
    constructor(message){
        super(message);
        this.name = 'UserExistsException';
        this.status = httpStatus.CONFLICT;
        this.message = message || 'User Exists';
    }
}

export class UserNotFoundException extends HttpException{
    constructor(message){
        super(message);
        this.name = 'UserNotFoundException';
        this.status = httpStatus.NOT_FOUND;
        this.message = message || 'User Not Found';
    }
}

export class InvalidOTPException extends HttpException{
    constructor(message){
        super(message);
        this.name = 'InvalidOTPException';
        this.status = httpStatus.BAD_REQUEST;
        this.message = message || 'Invalid otp';
    }
}