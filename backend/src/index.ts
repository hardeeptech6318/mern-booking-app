import express, { Request, RequestHandler, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import myHotelRoutes from "./routes/my-hotels"
import cookieParser from "cookie-parser"
import path from "path"
import {v2 as cloudinary} from "cloudinary"
import hotelRoutes from "./routes/hotel"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRECT
});

mongoose.connect(process.env.MONGODBU_CONNECTION_STRING as string)

const app= express();
app.use(express.json({limit: '50mb'}));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))


app.use(cors({
    origin:process.env.FRONTEND_URL ,
    credentials:true
}));




app.use(express.static(path.join(__dirname,"../../bookingappfromtend/dist")))

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/my-hotels",myHotelRoutes)
app.use("/api/hotels",hotelRoutes)


app.get("*",(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"../../bookingappfromtend/dist/index.html"))
})


const PORT=process.env.PORT  || 7000
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})
