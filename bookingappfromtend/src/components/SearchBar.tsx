import  { FormEvent, useState } from 'react'
import { useSearchContext } from '../contexts/SearchContext'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { Country,  City, ICountry,  ICity }  from 'country-state-city';

function SearchBar() {

    const search =useSearchContext();

    
    

    const [destination,setDestination]=useState<string>(search?.destination)
    const [checkIn,setCheckIn]=useState<Date>(search?.checkIn)
    const [CheckOut,setCheckOut]=useState<Date>(search?.CheckOut)
    const [adultCount,setAdultCount]=useState<number>(search?.adultCount)
    const [childCount,setChildCount]=useState<number>(search?.childCount)
    const [country,setCountry]=useState<string>("")
    // const [hotelId,setHotelId]=useState<string>(search?.hotelId || "")
    const navigate=useNavigate()
    const handleSubmit=(event:FormEvent)=>{
        event.preventDefault()
        search.saveSearchValues(destination,checkIn,CheckOut,adultCount,childCount)
        navigate("/search")
    }

    const minDate=new Date()
    const maxDate= new Date()
    maxDate.setFullYear(maxDate.getFullYear()+1)

  return (
    <form onSubmit={handleSubmit} className='-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4'>

<div className=' flex gap-5 flex-1'>
          <select
          onChange={(e)=>setCountry(e.target.value)}
          className=" border rounded w-full p-2 text-gray-700 font-normal"
          >
                <option value="" className="text-sm font-bold">Select as Country</option>
                {Country?.getAllCountries()?.map((country:ICountry)=>{
                
                return <option key={country.name} value={country.isoCode} className="text-sm font-bold">{country.name}</option>})}
          </select>
         

        
<select
          onChange={(e)=>setDestination(e.target.value)}
          className=" border rounded w-full p-2 text-gray-700 font-normal"
          >
                <option value="" className="text-sm font-bold">Select as Country</option>
                {City.getCitiesOfCountry(country)?.map((country:ICity)=>{
                
                return <option key={country.name} value={country.name} className="text-sm font-bold">{country.name}</option>})}
          </select>

          </div>

        <div className=' flex bg-white
         px-2 py-1 gap-2 rounded'>
            <label className=' items-center flex'>
                Adults:
                <input className=' w-full p-1 focus:outline-none font-bold ' type='number' min={1} max={20} value={adultCount} onChange={(event)=>setAdultCount(parseInt(event.target.value))}/>
            </label>

            <label className=' items-center flex'>
                Children:
                <input className=' w-full p-1 focus:outline-none font-bold ' type='number' min={0} max={20} value={childCount} onChange={(event)=>setChildCount(parseInt(event.target.value))}/>
            </label>

        </div>

        <div >
        <DatePicker selected={checkIn} onChange={(date) => setCheckIn(date as Date)} 
        selectsStart
        startDate={checkIn}
        endDate={CheckOut}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText='Check-in Date'
        className=' min-w-full bg-white p-2 focus:outline-none rounded'
        wrapperClassName='min-w-full '
        />
        </div>

        <div >
        <DatePicker selected={CheckOut} onChange={(date) => setCheckOut(date as Date)} 
        selectsStart
        startDate={checkIn}
        endDate={CheckOut}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText='Check-in Date'
        className=' min-w-full bg-white p-2 focus:outline-none rounded'
        wrapperClassName='min-w-full '
        />
        </div>

        <div className=' flex gap-1 rounded'>
            <button className=' w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500 rounded '>
                    Search
            </button>
            <button onClick={() => sessionStorage.clear()} className='w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500 rounded'>
    Clear
</button>


        </div>

    </form>
  )
}

export default SearchBar