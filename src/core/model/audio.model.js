import mongoose from "mongoose";

//define schema for audio model
const AudioSchema = new mongoose.Schema({
    //title of audio required and converted lowecase
    title:{
        type:string,
        required: [true, 'Audio title is required']
    },
    subTitle:{
        type:string
    },
    description :{
        type:string
    },
    shortAudioUrl:{
        type:string,
        required: [true, 'Short Audio Url is Required!']
    },
    
})