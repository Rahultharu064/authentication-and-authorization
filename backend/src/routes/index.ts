import {Router} from "express";
import authRoutes from "./auth";
import userRoutes from "./userRoutes";
 const rootRoutes:Router =Router();

 rootRoutes.use("/auth",authRoutes);// This is the main route for authentication
 rootRoutes.use('/accesser',userRoutes);// This is the main route for user access
 

 export default rootRoutes;

