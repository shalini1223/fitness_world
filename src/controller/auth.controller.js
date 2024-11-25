import { responseCodes } from "../core/constants/response.constants";
import {
  InvalidOTPException,
  InvalidOlPasswordException,
  InvalidPasswordException,
  UserExistsException,
  UserNotFoundException,
} from "../core/exceptions/auth.exceptions.js";
import { generateOTP, generatePassword } from "../core/helpers/auth.helper.js";
import { getUserProfile } from "../core/helpers/user.helper.js";
import User from "../core/model/user.model.js";
import {
  hashPassword,
  verifyPassword,
} from "../core/util/common/password.util.js";
import { createResponse } from "../core/util/common/response.util.js";
import { generateToken } from "../core/util/common/token.util.js";
import { logger } from "../core/util/logger/logger.js";
import * as dbService from "../db/service.js";
import { sendEmail } from "../core/util/sendgrid/sendgrid.js";

//Register user
export const register = async (req, res, next) => {
  try {
    const { email, password, fcmToken, timeZone } = req.body;
    logger.info({ "req.body": req.body });

    //check if user already exist
    const userExists = await dbService.findOne(User, {
      email,
      isDeleted: false,
    });
    if (userExists) {
      throw new UserExistsException();
    }
    if (fcmToken)
      await dbService.updateMany(User, { fcmToken }, { fcmToken: null });

    //hash given password
    const hashedPassword = await hashPassword(password);
    //save user to db
    const user = await dbService.create(User, {
      email,
      password: hashedPassword,
      fcmToken,
      timeZone,
    });
    const token = generateToken({ userId: user._id });
    req.user = user;
    createResponse(req, res, responseCodes.REGISTRATION_SUCESSFUL, {
      token,
      profile: getUserProfile(user),
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req,res, next) =>{
    try{
        const {email, password, fcmToken, timeZone} = req.body;

        const user = await dbService.findOne(User, {email, isDeleted:false});
        if(!user){
            throw new UserNotFoundException();
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if(!isPasswordValid){
            throw new InvalidPasswordException();
        }

        if(fcmToken)await dbService.updateMany(User, { fcmToken }, { fcmToken: null });

        const token = generateToken({userId:user._id});
        await dbService.findByIdAndUpdate(User, user._id,{
            ...(fcmToken && {fcmToken}),
            ...(timeZone && {timeZone})
        });

        createResponse(req,res.responseCodes.LOGIN_SUCCESSFUL,{
            token,
            profile: getUserProfile(user)
        });

    } catch (error) {
    next(error);
  }
};

/**
 * this function handles login process for user
 * @param {Object} req- the request object
 * @param {Object} res - the response object
 * @param {Function} next - the next middelware function
 * @throws {UserNotFoundException} if the user is not found
 */

export const adminLogin = async (req,res,next) =>{
    try{
        let {email, password} = req.body;

        //find user in db using provided email
        let user = await dbService.findOne(User,{email,isDeleted:false});
        if(!user){
            throw new UserNotFoundException();
        }

        //verify password with stored password
        const isPasswordValid = await verifyPassword(password,user.password);
        if(!isPasswordValid){
            throw new InvalidPasswordException();
        }

        //generate token and add it to user object
        let token = generateToken({userId: user._id});

        //send response with user object and success
        createResponse(req,res,responseCodes.LOGIN_SUCCESSFUL,{
            token,
            profile: getUserProfile(user)
        });

    }catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req,res,next)=>{
    try{
        const {email} = req.body;

    }catch (error) {
    next(error);
  }
}
