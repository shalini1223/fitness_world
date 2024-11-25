import bcrypt from 'bcrypt';

/**
 * hash password
 * @param {string} password
 * @returns {Promise<string>}
 */

export const hashPassword = async (password) =>{
    const  salt =await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

/**
 * verify password
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export const verifyPassword = async (password, hash)=>{
    return await bcrypt.compare(password, hash);
};