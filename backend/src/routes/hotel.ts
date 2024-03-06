import express, { Request, Response } from "express"
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/type";
import { param, validationResult } from "express-validator";
import Booking, { BookingSubmitData } from "../models/booking";
const router = express.Router()


router.get("/search", async (req: Request, res: Response) => {
    try {
      const query = constructSearchQuery(req.query);
  
      let sortOptions = {};
      switch (req.query.sortOption) {
        case "starRating":
          sortOptions = { startRating: -1 };
          break;
        case "pricePerNightAsc":
          sortOptions = { pricePerNight: 1 };
          break;
        case "pricePerNightDesc":
          sortOptions = { pricePerNight: -1 };
          break;
      }
  
      const pageSize = 5;
      const pageNumber = parseInt(
        req.query.page ? req.query.page.toString() : "1"
      );
      const skip = (pageNumber - 1) * pageSize;
  
      const hotels = await Hotel.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize);
  
      const total = await Hotel.countDocuments(query);
  
      const response: HotelSearchResponse = {
        data: hotels,
        pagination: {
          total,
          page: pageNumber,
          pages: Math.ceil(total / pageSize),
        },
      };
  
      res.json(response);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  });


const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};
    
    
    
  
    if (queryParams.destination && queryParams.destination !== "" ) {
      constructedQuery.$or = [
        { city: new RegExp(queryParams.destination, "i") },
        { country: new RegExp(queryParams.destination, "i") },
      ];
    }
  
    if (queryParams.adultCount) {
      constructedQuery.adultCount = {
        $gte: parseInt(queryParams.adultCount),
      };
    }
  
    if (queryParams.childCount) {
      constructedQuery.childCount = {
        $gte: parseInt(queryParams.childCount),
      };
    }
  
    if (queryParams.facilities) {
      constructedQuery.facilities = {
        $all: Array.isArray(queryParams.facilities)
          ? queryParams.facilities
          : [queryParams.facilities],
      };
    }
  
    if (queryParams?.type) {
        
        
        
        
      constructedQuery.type = {
        $in: Array.isArray(queryParams.type)
          ? queryParams.type
          : [queryParams.type],
      };
    }
  
    if (queryParams.stars) {
        
        
      const starRatings = Array.isArray(queryParams.stars)
        ? queryParams.stars.map((star: string) => parseInt(star))
        : [parseInt(queryParams.stars)];
  
      constructedQuery.startRating = { $in: starRatings };
    }
  
    if (queryParams.maxPrice && queryParams.maxPrice !== "") {
      constructedQuery.pricePerNight = {
        $lte: parseInt(queryParams.maxPrice).toString(),
      };
    }
  
    return constructedQuery;
  };


  router.post("/booking",async (req: Request, res: Response) => {
    try {
      
      const data=req.body
      await new Booking(data).save()
      

      return res.status(200).json({message:"Booking Confirmed"})
      
      
    } catch (error) {
      console.log("error", error);
        res.status(500).json({ message: "Something went wrong" });
    }
  })


  router.get("/:id",[
    param("id").notEmpty().withMessage("Hotel id is required")
  ], async (req: Request, res: Response) => {
    try {
      const error=validationResult(req)
      if(!error.isEmpty()) return res.status(400).json({errors:error.array()})
      
      const id= req.params.id.toString()
  
      const hotel= await Hotel.findById(id)
  
      return res.json(hotel)
  
  
    } catch (error) {
      console.log("error", error);
        res.status(500).json({ message: "Something went wrong" });
    }
  })
  


export default router