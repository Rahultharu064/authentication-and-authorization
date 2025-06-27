import { NextFunction, Request, Response } from "express";

export const authrolesMiddleware = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      console.log("No user info");
      void res.status(401).json({ message: "Unauthorized: No user info" });
    }

    // debug log

    if (user.role !== requiredRole) {
      console.log("User does not have required role");
      void res.status(403).json({ message: "Forbidden: Insufficient role" });
    }

    next(); // ✅ only call next when authorized
  };
};
