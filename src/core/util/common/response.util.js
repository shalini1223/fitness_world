/**
 * function to make response object
 * @param {object} req
 * @param {object} res
 * @param {code} message
 * @param {object} data
 */

export const createResponse = (req,res, message, data) =>{
    return res.status (200).json({
        status:true,
        message: req.t(`success.${message}`),
        ...(data && {data})
    });
}; 