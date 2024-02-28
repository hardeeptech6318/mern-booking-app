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
        const imageUrls = await uploadImage(imageFiles);

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


router.get("/",verifyToken,async(req:Request,res:Response)=>{
    try {
        const hotels=await Hotel.find({userId:req.userId})
        res.json(hotels)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
        
    }
})


router.get("/:id",verifyToken,async(req:Request,res:Response)=>{
    try {
        const id=req.params.id.toString()
        const hotels=await Hotel.findOne({_id:id,userId:req.userId})
        res.json(hotels)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
        
    }
})


router.put("/:hotelId",verifyToken ,upload.array("imageFiles",6),async(req:Request,res:Response)=>{
    try {
        console.log(req.body);
        
        const updatedHotel:HotelType=req.body
        console.log(updatedHotel.imageUrls);
        
        updatedHotel.lastUpdated=new Date();

        const hotel=await Hotel.findOneAndUpdate({
            _id:req.params.hotelId,
            userId:req.userId
        },updatedHotel,{
            new:true
        })

        if(!hotel) return res.status(404).json({message:"Hotel not found"})



        const imageFiles=req.files as Express.Multer.File[];
        
        // upload image to cludinary
        const imageUrls = await uploadImage(imageFiles);

        hotel.imageUrls=[...imageUrls,...(updatedHotel.imageUrls) || []]

        await hotel.save()

        res.status(201).json(hotel);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
        
    }
})




async function uploadImage(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default router
