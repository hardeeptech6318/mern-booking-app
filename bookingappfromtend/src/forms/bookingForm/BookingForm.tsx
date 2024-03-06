import { useForm } from "react-hook-form"
import { HotelType, UserType, userBooking } from "../../api-clients"
import { useMutation } from "react-query";
import toast from "react-hot-toast";

type Props={
    currentUser:UserType;
    costPerNight:number;
    numberOfNights:number;
    adultCount:number;
childCount:number;
hotel:HotelType
        checkIn:Date
checkOut:Date
}

export type BookingFormData={
    firstName:string;
    lastName:string;
    email:string;
}

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
    hotelName:string;
    city:string
    
}




function BookingForm({currentUser,numberOfNights,costPerNight,adultCount,childCount,checkIn,checkOut,hotel}:Props) {
    
    console.log(hotel);
    
const {register,handleSubmit}=useForm<BookingFormData>({
    defaultValues:{
        firstName:currentUser.firstName,
        lastName:currentUser.lastName,
        email:currentUser.email
    }
})

const mutation =useMutation(userBooking,{
    onSuccess:async ()=>{
      toast.success("Hotel Booked")
      
},
    onError:(errors:Error)=>{
        toast.error(errors.message)
    }
    
    
  })
  
  const onSubmit=handleSubmit((data)=>{
        
    const obj={    costPerNight,
        numberOfNights,
        adultCount,
        childCount,
        checkIn,
        checkOut,
        hotelId:hotel._id,
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        currentUser:currentUser._id,
        totalAmount:costPerNight*numberOfNights,
        hotelName:hotel.name,
        city:hotel.city
    }
      mutation.mutate(obj)
  })


  return (
    <form onSubmit={onSubmit} 
    className=" grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
        <span className=" text-3xl font-bold">Confirm Your Details</span>
        <div className=" grid grid-cols-2 gap-6">
            <label className=" text-gray-700 text-sm font-bold flex-1">
                First Name
                <input className=" mt-1 border rounded w-full py-2 px-3 text-gray-700  bg-gray-200 font-normal"
                
                type="text" 
                readOnly
                disabled
                {...register("firstName")}
                />

            </label>

            <label className=" text-gray-700 text-sm font-bold flex-1">
                Last Name
                <input className=" mt-1 border rounded w-full py-2 px-3 text-gray-700  bg-gray-200 font-normal"
                type="text" 
                readOnly
                
                disabled
                {...register("lastName")}
                />

            </label>

            <label className=" text-gray-700 text-sm font-bold flex-1">
                Email
                <input className=" mt-1 border rounded w-full py-2 px-3 text-gray-700  bg-gray-200 font-normal"
                type="text" 
                
                readOnly
                disabled
                {...register("email")}
                />

            </label>
        </div>

        <div className=" space-y-2">
            <h2 className=" text-xl font-semibold">Your Price Summary</h2>
        </div>

        <div className=" bg-blue-200 p-4 rounded-md">
            <div className=" font-semibold text-lg">
                    Total Cost:{costPerNight*numberOfNights}
            </div>
            <div className=" text-sm">Include taxes and charges</div>
        </div>

        <button type="submit">Submit</button>

    </form>
  )
}

export default BookingForm