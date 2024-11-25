import {randomBytes} from 'crypto';
import {generate} from 'generate-password';
/**
 * genearte otp
 * @param {number} length
 * @returns {number}
 */
export const generateOTP = (length = 6) =>{
    const digits = '1234567890';
    let OTP = '';
    for(let i=0;i<length;i++){
        let index= randomBytes(1)[0]% digits.length;
        OTP += digits[index];
    }
    return parseInt(OTP);
};

export const geneartePassword = (length =10)=>{
    return generate({
        length,
        numbers:true,
        symbols:false
    })
}