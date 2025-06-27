import {json, NextFunction, Request,Response}from "express";
import {hashSync,compareSync}from "bcrypt"
import * as jwt  from "jsonwebtoken"
import { prisma  } from "..";
import { JWT_SECRET } from "../../secrets";
import { Role } from "../generated/prisma";




export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ status: false, message: "Name, email, and password are required" });
    }

    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ status: false, message: "User already exists" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
        role: role === "ADMIN" ? Role.ADMIN : Role.USER,
      }
    });

    res.status(201).json({ status: true, message: "User registered successfully" });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};



export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
        throw new Error("User does not exist");
    }

    if (!user.password || !compareSync(password, user.password)) {
        throw new Error("Invalid password");
    }

    // ✅ Make sure role is included here
    const token = jwt.sign(
        {
            userId: user.id,
            role: user.role,  // ✅ This is the key!
        },
        JWT_SECRET,
        { expiresIn: "20days" }
    );

    res.status(200).json({ user, token, message: "Login successful" });
};
