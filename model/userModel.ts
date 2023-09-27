import mongoose, { Document, Schema } from 'mongoose';

export interface IUser{
    username:string,
    email_id:string,
    password:string,
    phoneNumber:string
}


const UserSchema= new Schema<IUser>({
    username:{
        type:String,
        required:true
    },
    email_id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    }
},{timestamps:true})


const  UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;