import React, {  useContext, useState } from "react";

type SearchContextType = {
    destination: string;
    checkIn: Date;
    CheckOut: Date;
    adultCount: number;
    childCount: number;
    hotelId?: string;
    saveSearchValues: (
        destination: string, 
        checkIn: Date, 
        CheckOut: Date, 
        adultCount: number, 
        childCount: number) => void

}


const SearchContext=React.createContext<SearchContextType | undefined>(undefined)


export const SearchContextProvider=({children}:{children:React.ReactNode})=>{

    const [destination,setDestination]=useState<string>(()=>sessionStorage.getItem("destination") || "")
    const [checkIn,setCheckIn]=useState<Date>(()=>new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()))
    const [CheckOut,setCheckOut]=useState<Date>(()=>new Date(sessionStorage.getItem("CheckOut") || new Date().toISOString()))
    const [adultCount,setAdultCount]=useState<number>(()=>parseInt( sessionStorage.getItem("adultCount") || "1"))
    const [childCount,setChildCount]=useState<number>(()=>parseInt( sessionStorage.getItem("childCount") || "0"))
    const [hotelId,setHotelId]=useState<string>(()=>sessionStorage.getItem("hotelId") || "")

    const saveSearchValues=(destination:string,checkIn:Date,CheckOut:Date,adultCount:number,childCount:number,hotelId?:string)=>{

            

            setDestination(destination)
            setCheckIn(checkIn)
            setCheckOut(CheckOut)
            setAdultCount(adultCount)
            setChildCount(childCount)
            if(hotelId) setHotelId(hotelId)

            sessionStorage.setItem("destination", destination);
            sessionStorage.setItem("checkIn", checkIn.toISOString());
            sessionStorage.setItem("CheckOut", CheckOut.toISOString());
            sessionStorage.setItem("adultCount", adultCount.toString());
            sessionStorage.setItem("childCount", childCount.toString());
        
            if (hotelId) {
              sessionStorage.setItem("hotelId", hotelId);
            }
            
    }

    return (
        <SearchContext.Provider value={{
            destination,checkIn,CheckOut,adultCount,childCount,hotelId,saveSearchValues
        }}>
            {children}
            </SearchContext.Provider>
    )
}


export const useSearchContext = () =>{
    const context =useContext(SearchContext)

    
    

    return context as SearchContextType
}