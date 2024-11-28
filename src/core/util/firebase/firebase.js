import admin from 'firebase-admin';
import {S3FileManager} from '../aws/s3.js';
const s3Manager = new S3FileManager();

const serviceAccountKey = await s3Manager.getFile(process.env.FIREBASE_KEY);
const firebaseConfig = JSON.parse(serviceAccountKey.Body.toString('utf-8'));

const firebase = admin.initializeApp({
    credential:admin.credential.cert(firebaseConfig)
});

export {firebase};