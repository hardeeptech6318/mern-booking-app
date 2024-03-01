
import { useQuery } from 'react-query';
import { useSearchContext } from '../contexts/SearchContext'
import { searchHotels } from '../api-clients';
import { useState } from 'react';
import SearchResultsCard from '../components/SearchResultCard';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/StarRatingFilter';
import TypeFilter from '../components/TypeFilter';
import FacilityFilter from '../components/FacilityFilter';
import MaxPriceFilter from '../components/MaxPriceFilter';

function Search() {
    const search =useSearchContext()
    const [page,setpage]=useState<number>(1)
    const [selectedStars,setSelectedStars]=useState<string[]>([])
    const [selectedType,setSelectedType]=useState<string[]>([])
    const [selectedFacility,setFacilityType]=useState<string[]>([])
    const [selectedMaxPrice,setSelectedMaxPrice]=useState<string>("")
    const [sortOption,setSortOption]=useState<string>("")

    const searchParams={
        destination:search.destination,
        checkIn:search.checkIn.toISOString(),
        checkOut:search.CheckOut.toISOString(),
        adultCount:search.adultCount.toString(),
        childCount:search.childCount.toString(),
        page:page.toString(),
        stars:selectedStars,
        type:selectedType,
        facilities:selectedFacility,
        maxPrice:selectedMaxPrice,
        sortOption
    }

    const handleStarChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const starRating=event.target.value;

        setSelectedStars((prev)=>event.target.checked?[...prev,starRating]:prev.filter((star)=>star !== starRating))
    }

    const handleTypeChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const typeRating=event.target.value;

        setSelectedType((prev)=>event.target.checked?[...prev,typeRating]:prev.filter((type)=>type !== typeRating))
    }

    const handleFacilityChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const facilityType=event.target.value;

        setFacilityType((prev)=>event.target.checked?[...prev,facilityType]:prev.filter((facility)=>facility !== facilityType))
    }

    const handleMaxpriceChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
        const selectedMaxPrice=event.target.value;

        setSelectedMaxPrice(selectedMaxPrice)
    }

    // console.log(searchParams);
    

    const {data:hotelData} =useQuery(["searchHotels",searchParams],()=>searchHotels(searchParams))
    // console.log(hotelData);

  
    
  return (
    <div className=' grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>

        <div className=' rounded-lg border border-slate-300 p-5 h-fit sticky top-10'>
            <div className=' sapce-y-5'>
                <h3 className=' text-lg font-semibold border-b border-slate-300 pb-5'>
                        Filter By
                </h3>
                <StarRatingFilter selectedStars={selectedStars} onChange={handleStarChange}/>
                <TypeFilter selectedType={selectedType} onChange={handleTypeChange}/>
                <FacilityFilter selectedFacility={selectedFacility} onChange={handleFacilityChange} />
                <MaxPriceFilter slectedPrice={selectedMaxPrice} onChange={handleMaxpriceChange}/>
            </div>

        
        </div>

        <div className=' flex flex-col gap-5'>
            <div className=' flex justify-between items-center'>
                <span className=' text-xl font-bold'>
                    {hotelData?.pagination.total} Hotels found
                    {search.destination ? `in ${search.destination}` :"" }
                </span>
                <span>
                    <select 
                    className=' p-2 border rounded-md'
                    value={sortOption} onChange={(event)=>setSortOption(event.target.value)}>
                            <option value=""> Sort By</option>
                            <option value="starRating">Star Rating</option>
                          
                            <option value="pricePerNightAsc">Price Per Night (low to high)</option>
                            <option value="pricePerNightDesc">Price Per Night (high to low)</option>
                    </select>

                </span>
            </div>
            {hotelData?.data.map((hotel)=>(
                <SearchResultsCard hotel={hotel} />
            ))}
            <div>
            <Pagination page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1} onPageChange={(page)=>setpage(page)}/>
            </div>
        </div>
        
    </div>
  )
}

export default Search