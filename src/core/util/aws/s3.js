import aws from 'aws-sdk';
import {compressImage} from '../sharp/sharp.js';
import {v4 as uuidv4} from 'uuid';
import path from 'path';

export class S3FileManager {
    folder = 'uploads';

    constructor(){
        this.s3 = new aws.S3({
            region: process.env.AWS_REGION,
            credentials:{
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
            },
            params: {Bucket: process.env.AWS_BUCKET_NAME, ACL: 'public-read'}
        });
    }

/**
 * upload file to s3
 * @param {File} file 
 * @param {String} extraDir to upload optional
 * @returns {Promise} from s3 upload promise
 */
async uploadFile(file, extraDir = '') {
    if(
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
    ){
file.buffer = await compressImage(file);
    }
    const params = {
        key: `${this.folder}${extraDir}/${uuidv4()}.${file.originalname.split('.').pop('.')}`,
        Body: file.buffer
    };
    return this.s3.upload(params).promise();
};

/**
 * delete file from s3
 * @param {string} s3Url
 * @returns {Promise} s3 delete promise
 */
async deleteFiles(s3Url) {
    if(!s3Url) return Promise.resolve();
    return this.s3.deleteObject({key:path.basename(s3Url)}).promise();
}

/**
 * get file from s3
 * @param {string} key
 * @returns {Promise} s3 get promise
 */
async getFile(){
    return this.s3.getObject({key:key}).promise();
}
}