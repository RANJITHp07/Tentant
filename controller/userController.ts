import { NextFunction, Request, Response } from "express";
import UserModel from "../model/userModel";
import bcrypt from "bcrypt";


// to create user
export const  userSignIn=async(req:Request,res:Response,next:NextFunction)=>{
    try{
       const {username,email_id,password,phoneNumber}=req.body
       const existUser=await UserModel.findOne({email:email_id});

       if(existUser){
         res.status(202).json({sucess:false,message:"Already the user Exist"})
       }else{
        const saltRounds:number = 10;
        const salt = await bcrypt.genSalt(saltRounds);
         const hashedPassword = await bcrypt.hash(password, salt); // hashed the password
         const newUser={...req.body,password:hashedPassword}
         await UserModel.create(newUser)

         res.status(202).json({sucess:true,message:"User created"})
       }
    }catch(err){
       new Error(`authentication err:${err}`);
       next(err)
    }
}


//to  allow login of user with email_id

export const userLogin=async(req:Request,res:Response,next:NextFunction)=>{
    try{
       const {email_id,password}=req.body

       const existUser=await UserModel.findOne({email:email_id});

       if(existUser){
        const match = await bcrypt.compare(password, existUser.password);
           
            match ?res.status(200).json({success:true,message:"Logged in succesfully"}) : res.status(200).json({success:false,message:"password not matching"}) 
       }else{
        res.status(200).json({success:false,message:"This user does not exist"})
       }
    }catch(err){
        new Error(`authentication err:${err}`);
       next(err)
    }
}
