import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema(
    {
        role:{
            type:String,
            default: 'user'
        },
        email:{
            type:String,
            required: [true, 'Email is Required !']
        },
        firstName:{
            type:String
        },
        lastName: {
            type:String
        },
        password:{
            type:String,
            required: [true, 'Password is required!']
        },
        passwordResetCode: {
            type: Number
        },
        passwordResetExpiry: {
            type:Date
        },
        passwordResetCodeSentAt:{
            type:Date
        },
        isEmailVerified: {
            type:Boolean,
            default: false
        }
    },
    {timestamps:true, versionKey: false}
);

UserSchema.index({role:1,crearedAt:1});

const User = mongoose.model('User', UserSchema);
export default User; 