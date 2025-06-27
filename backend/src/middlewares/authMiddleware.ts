
import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../secrets"

// Extend Express Request interface to include 'users' property
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}



export const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{

    //get token from users 
    const authHeader = req.headers.authorization || req.headers.Authorization;
    let token: string | undefined;  //

    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    if (!token) {
         res.status(401).json({ message: "Unauthorized and token is not provided" });

         return;
    }

    try {
  const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  req.user = decoded;
  console.log("Authorizes user",decoded)
  next();
} catch (err) {
  console.error("Token verification error:", err);
  res.status(401).json({ message: "Invalid token" });
}

}
