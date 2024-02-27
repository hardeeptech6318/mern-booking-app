import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import cookieParser from "cookie-parser"
import path from "path"

mongoose.connect(process.env.MONGODBU_CONNECTION_STRING as string)

const app= express();
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
console.log(process.env.FRONTEND_URL);

app.use(cors({
    origin:process.env.FRONTEND_URL ,
    credentials:true
}));

app.use(express.static(path.join(__dirname,"../../bookingappfromtend/dist")))

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)

const PORT=process.env.PORT  || 7000
app.listen(PORT,()=>{
    console.log("server running on port 7000");
    
})
