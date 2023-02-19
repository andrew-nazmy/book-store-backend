import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();


export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        throw new Error();
      }     
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string,);
      if(decoded)
      next();
      else
    {      res.status(401)
      res.json('Access denied, invalid token')
      return
    }
    } catch (err) {
      res.status(401).send('Please authenticate');
    }
   };