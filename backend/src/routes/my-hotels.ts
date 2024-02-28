import express, { Request, Response } from "express"
import cloudinary from "cloudinary"
const router = express.Router()
import multer from "multer"
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body} from "express-validator";

const storage=multer.memoryStorage();
const upload=multer({
    storage,limits:{
        fileSize:5*1024*1024 // 5 MB
    }
});


router.post("/",verifyToken,[
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("Name is required"),
    body("country").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Name is required"),
    body("type").notEmpty().withMessage("Name is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Name is required"),
    body("facilities").notEmpty().isArray().withMessage("Name is required"),
] ,upload.array("imageFiles",6),async(req:Request,res:Response)=>{
    try {
        const imageFiles=req.files as Express.Multer.File[];
        const newHotel:HotelType=req.body;
        // upload image to cludinary
        const uploadPromises=imageFiles.map(async(image)=>{
            const b64=Buffer.from(image.buffer).toString("base64");
            let dataURI="data:"+image.mimetype + ";base64,"+b64;
            const res=await cloudinary.v2.uploader.upload(dataURI);
            return res.url
        })

        const imageUrls=await Promise.all(uploadPromises)

        newHotel.imageUrls=imageUrls;
        newHotel.lastUpdated=new Date();
        newHotel.userId=req.userId;

        const hotel=new Hotel(newHotel);
        await hotel.save()

        res.status(201).send(hotel);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
        
    }
})

export default router