import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface IGetUserAuthInfoRequest extends Request {
  user: any
}

export const signinverify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decode: any = jwt.verify(req.headers.authorization as string, process.env.JWT_KEY as string);
    if (decode) {
      (req as IGetUserAuthInfoRequest).user = decode;
      next();
    }else{
        res.status(403).json("user is unAutherized")
    }
  } catch (err) {
    console.log(err);
  }
};