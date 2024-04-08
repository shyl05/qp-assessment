import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

function getToken(req: Request) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } 
    return null;
}

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req);
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, jwtSecret as Secret, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      if(decoded.role === 'admin'){
        next();
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
    });
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req);
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, jwtSecret as Secret, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      if(decoded.role === 'user'){
        next();
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
    });
};