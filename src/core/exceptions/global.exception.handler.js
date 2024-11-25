import httpStatus from 'http-status';
import {HttpException} from './http.exception.js';
import {logger} from '../util/logger/logger.js';
import {environments} from '../contants/common.js';

export const globalExceptionhandler =(error, req,res, next) =>{
    logger.error(error);

    if(error instanceof HttpException){
        return res.status(error.status || httpStatus.INTERNAL_SERVER_ERROR).json({
            message:
            req.t(`exceptions.${error.name}`) ||
            error.message ||
            req.t('exceptions.InternalServerError'),
            status: false,
            ...(process.env.ENVIRONMENT === environments.DEVELOPMENT && {
                error,
                stack: error.stack
            })
        });
    }

return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: req.t('exceptions.InternalServerError'),
    status:false,
    ...(process.env.ENVIRONMENT === environments.DEVELOPMENT && {
        error,
        stack: error.stack
    })
});
}