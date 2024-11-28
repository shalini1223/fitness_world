import mongoose from 'mongoose';
/**
 * Function to convert string id to MongoDB objectid
 * @param {string} id - string to convert
 * @returns {ObjectId} the mongodb objectid
 */
export const mongoObjectId =(id) =>{
    return new mongoose.Types.ObjectId(id);
}