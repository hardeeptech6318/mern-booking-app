

import mongoose from "mongoose";



export type BookingSubmitData={
    firstName:string;
    lastName:string;
    email:string;
    currentUser:string;
    costPerNight:number;
    numberOfNights:number;
    adultCount:number;
    childCount:number;
    checkIn:Date
    checkOut:Date
    hotelId:string;
    totalAmount:number;
}


const bookingSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    currentUser: { type: String, required: true },
    costPerNight: { type: Number, required: true },
    numberOfNights: { type: Number, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    hotelId: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    hotelName:{ type: String, required: true },
    city:{ type: String , required: true },
});



const Booking =mongoose.model<BookingSubmitData>("Booking",bookingSchema)
export default Booking;