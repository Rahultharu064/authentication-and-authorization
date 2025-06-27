import express, { Request, Response } from "express";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authrolesMiddleware } from "../middlewares/authrolesMiddleware";

const userRoutes: Router = Router();

userRoutes.get(
  "/admin",
  authMiddleware,
  authrolesMiddleware("ADMIN"), 
  (req: Request, res: Response) => {
    res.json({ message: "welcome to admin",user:req.user });
  }
);

userRoutes.get(
  "/user",
  authMiddleware,
  authrolesMiddleware("USER"),
  
  (req: Request, res: Response) => {
    res.json({ message: "welcome to user" });
  }
);

export default userRoutes;
