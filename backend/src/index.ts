import express, { Express, Request, Response ,NextFunction} from "express";

// Custom path
import { PrismaClient } from '@prisma/client';
import rootRoutes from "./routes";
import cors from 'cors';
import { PORT } from "../secrets";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["get","post","put","delete"]
}))

app.use(cookieParser()as any);
app.use(express.json({
    verify:(req,res,buf)=>{
        if(
            buf.length===0 && req.headers["content-type"]?.includes('application/json')
        ){
            throw new Error("Missing JSON in request body");    
        }
    }
}))

export const prisma = new PrismaClient({
    log: ["query"]
})
//Routes
app.use("/api",rootRoutes);
app.use("/api",userRoutes)



// async function main() {
//     const post =await prisma.post.create({
//         data:{
//             title:"my title",
//             content:"my content",
//             published:true,
//             authorId:"some-author-id"



//         }
//     })
//     console.log(post);
    
// }


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});