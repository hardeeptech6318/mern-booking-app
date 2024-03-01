
import { useQuery } from 'react-query'
import { fetchCurrentUser, fetchHotelById } from '../api-clients'
import BookingForm from '../forms/bookingForm/BookingForm'
import { useSearchContext } from '../contexts/SearchContext'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import BookingDetailSummary from '../components/BookingDetailSummary'

function Booking() {
    const search = useSearchContext()
    const {hotelId}=useParams()
    const [numberOfNights,setNumberOfNights]=useState<number>(0)

    useEffect(()=>{
        if(search.checkIn && search.CheckOut){
            const nights=Math.abs(search.CheckOut.getTime()-search.checkIn.getTime())/(1000*60*60*24)
            setNumberOfNights(Math.ceil(nights))
        }

    },[search.checkIn,search.CheckOut])


    const {data:currentUser}=useQuery("fetchcurrentuser",fetchCurrentUser)
    
    const {data:hotel}=useQuery("fetchHotelById",()=>fetchHotelById(hotelId as string),{
        enabled: !!hotelId
    })

    if(!hotel) return <span>Hotel Not Found</span>
    
    return (
    <div className=' grid md:grid-cols-[1fr_2fr]'>
       
        <BookingDetailSummary 
        checkIn={search.CheckOut}
        checkOut={search.CheckOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
        
        />
        {currentUser && <BookingForm
        costPerNight={hotel.pricePerNight}
        numberOfNights={numberOfNights}
        currentUser={currentUser}
        adultCount={search.adultCount}
        childCount={search.childCount}
        hotel={hotel}
        checkIn={search.checkIn}
        checkOut={search.CheckOut}
        />
        
        }
        
    </div>
  )
}

export default Booking