import { Router } from "express";
import validateMiddleware from "../middleware/validator";
import { userLogin, userSignIn } from "../controller/userController";

const router=Router();

router.post('/api/signup',validateMiddleware,userSignIn); //to signup

router.post('/api/login',userLogin); //to allow login for a user

export default router