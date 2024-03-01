import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import {  fetchMyHotels } from "../api-clients"
import toast from "react-hot-toast"
import { BsBuilding, BsMap } from "react-icons/bs"
import { BiHotel, BiMoney, BiStar } from "react-icons/bi"


function MyHotel() {
    const {data:hotelData}=useQuery("fetchMyHotels",fetchMyHotels,{
        onError:(e:Error)=>toast.error(e.message)
    })

    if(!hotelData) return <span>No Hotel Found</span>

    return (
    <div className=" space-y-5">
        <span className=" flex justify-between">
            <h1 className=" text-3xl font-bold">My Hotels</h1>
            <Link to="/add-hotel" className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded">Add Hotel</Link>
        </span>

        <div className="grid grid-cols-1 gap-8">
          {hotelData.map((hotel)=>{
            return  <div className=" flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5 " key={hotel._id}>

                <h2 className=" text-2xl font-bold">{hotel.name}</h2>
                <div className=" whitespace-pre-line">{hotel.description}</div>

                <div className=" grid grid-cols-5 gap-2">
                    <div className=" border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                      <BsMap/>
                        {hotel.city},{hotel.country}
                    </div>
                </div>

                <div className=" border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                      <BsBuilding/>
                        {hotel.type}
                    </div>

                    <div className=" border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                      <BiMoney/>
                        {hotel.pricePerNight}
                    </div>

                    <div className=" border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                      <BiHotel/>
                        {hotel.adultCount} aduls, {hotel.childCount} children
                    </div>

                    <div className=" border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                      <BiStar/>
                        {hotel.startRating} Star rating
                    </div>

                    <span className=" flex justify-end">
                        <Link className="flex bg-blue-600 text-white text-xl font-bold p-2 rounded hover:bg-blue-500" to={`/edit-hotel/${hotel._id}`}>View details</Link>
                    </span>
            </div>
          })}

        </div>

    </div>
  )
}

export default MyHotel