import sgMail from '@sendgrid/mail';
import { logger } from '../logger/logger';

sgMail.setApiKey(process.env.SENGRID_API_KEY);

export const sendEmail = async (to, subject, text,html)=>{
    const msg = {to, from: process.env.EMAIL_FROM, subject, text,html};

    try{
        await sgMail.send(msg);
        logger.info(`Email Sent sucess to ${to}`);
    }catch(error){
        logger.error(`Error send email: ${error}`);
    }
}