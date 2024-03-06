
import { useQuery } from 'react-query'
import { myBookings } from '../api-clients'
import { BsMap } from 'react-icons/bs'
import { BiHotel, BiMoney } from 'react-icons/bi'
import { BookingSubmitData } from '../forms/bookingForm/BookingForm'


function MyBooking() {

    const {data}=useQuery("mybookings",myBookings)

    

  return (
    <div>
      <h1 className=" text-3xl font-bold mb-3">My bookings</h1>
      {data?.map((hotel:BookingSubmitData,i:number)=>{
            return  <div className=" flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5 mb-5" key={i}>

                <h2 className=" text-2xl font-bold">{hotel.hotelName}</h2>
                

              
                    <div className=" border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                      <BsMap/>
                        {hotel.city}
                    </div>
               

             

                    <div className=" border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                      <BiMoney/>
                        {hotel.costPerNight}
                    </div>

                    <div className=" border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                      <BiHotel/>
                        {hotel.adultCount} aduls, {hotel.childCount} children
                    </div>

                    <div className=" border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                      Check IN
                        {hotel.checkIn?.toString()} 
                    </div>
                    <div className=" border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                      Check out
                        {hotel.checkOut?.toString()} 
                    </div>

                    <div className=" border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                      Total Amount:{hotel.totalAmount}
                        
                    </div>

                   
            </div>
          })}
    </div>
  )
}

export default MyBooking