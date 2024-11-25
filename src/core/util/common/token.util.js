import jwt from 'jsonwebtoken';
import {
    InvalidTokenException,
    TokenExpiredException
} from '../../exceptions/auth.exceptions.js';

/**
 * generate token
 * @param {object} payload
 * @returns
 */
export const generateToken = (payload) =>{
    return jwt.sign(payload,process.env.JWT_SECRET);
};

/**
 * verify token
 * @param {string} token
 * @returns
*/

export const verifyToken = (token) =>{
    try{
        return jwt.verify(token, process.env.JWT_SECRET);
    }catch(error){
        if(error instanceof jwt.TokenExpiredError){
throw new TokenExpiredException();
        }else{
            throw new InvalidTokenException();
        }
    }
};