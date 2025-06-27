import { Router, Request, Response, NextFunction } from "express"

import { PrismaClient } from "@prisma/client";
import * as authController from "../controllers/auth";

const prisma = new PrismaClient();
const authRoutes:Router =Router();


function asyncHandler(fn: any) {
	return function(req: Request, res: Response, next: NextFunction) {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}


authRoutes.post("/signup", asyncHandler(authController.signup));
authRoutes.post("/login", asyncHandler(authController.login));



export default authRoutes;