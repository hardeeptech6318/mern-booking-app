
import { RegisterFormData } from "./pages/Register";
import { LoginFormData } from "./pages/SignIn";
const API_BASE_URL =import.meta.env.VITE_API_BASE_URL || '';


import { BookingSubmitData } from "./forms/bookingForm/BookingForm";

export type HotelSearchResponse ={
  data:HotelType[];
  pagination:{
      total:number;
      page:number;
      pages:number;
  }
}

export type HotelType={
    _id:string;
    userId:string;
    name:string;
    city:string;
    country:string;
    state:string;
    description:string;
    type:string;
    adultCount:number;
    childCount:string;
    facilities:string[];
    pricePerNight:number;
    startRating:number;
    imageUrls:string[];
    lastUpdated:Date;
    }

    export type UserType={
      _id:string;
      email:string;
      
      firstName:string;
      lastName:string;
      }


    export const fetchCurrentUser=async():Promise<UserType>=>{
      const response=await fetch(`${API_BASE_URL}/api/users/me`, {
          method: "GET",
          credentials: "include",
          
        });
        if (!response.ok) {
          throw new Error("Failed to Fetch hotel");
        }
      
        const responseData=await response.json();
        return responseData.user  
      }

export const registerUser =async (formData:RegisterFormData)=>{
    
        const response=await fetch(`${API_BASE_URL}/api/users/register`,{
            method:'POST',
            credentials:"include",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify(formData)
        })
        
        const responseBody=await response.json();
        if(!response.ok){
            throw new Error(responseBody.message)
        }
}

export const userBooking =async (formData:BookingSubmitData)=>{
    
  const response=await fetch(`${API_BASE_URL}/api/hotels/booking`,{
      method:'POST',
      credentials:"include",
      headers:{
          "Content-Type":'application/json'
      },
      body:JSON.stringify(formData)
  })
  
  const responseBody=await response.json();
  if(!response.ok){
      throw new Error(responseBody.message)
  }
}

export const validateToken=async ()=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        method:'GET',
        credentials:"include",
        headers:{
            "Content-Type":'application/json'
        },
        
    })

    if(!response.ok){
        throw new Error("Token invalid")
    }
    
    return  response.json();
   
}


export const signIn =async (formData:LoginFormData)=>{
    
    const response=await fetch(`${API_BASE_URL}/api/auth/login`,{
        method:'POST',
        credentials:"include",
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify(formData)
    })
    
    const responseBody=await response.json();
    if(!response.ok){
        throw new Error(responseBody.message)
    }
}


export const signOut=async ()=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/logout`,{
        method:'POST',
        credentials:"include",
        headers:{
            "Content-Type":'application/json'
        },
        
    })

    if(!response.ok){
        throw new Error("Token invalid")
    }
    
    return  response.json();
   
}

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
      method: "POST",
      credentials: "include",
      body: hotelFormData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to add hotel");
    }
  
    return response.json();
  };

export const fetchMyHotels=async():Promise<HotelType[]>=>{
    const response=await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "GET",
        credentials: "include",
        
      });
      if (!response.ok) {
        throw new Error("Failed to Fetch hotel");
      }
    
      return response.json();
}

export const fetchMyHotelsById=async(id:string):Promise<HotelType>=>{
    const response=await fetch(`${API_BASE_URL}/api/my-hotels/${id}`, {
        method: "GET",
        credentials: "include",
        
      });
      if (!response.ok) {
        throw new Error("Failed to Fetch hotel");
      }
    
      return response.json();
}


export const updateMyHotelById = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
      method: "PUT",
      credentials: "include",
      body: hotelFormData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to add hotel");
    }
  
    return response.json();
  };


  export type SearchParams={
    destination?:string;
    checkIn?:string;
    checkOut?:string;
    adultCount?:string;
    childCount?:string;
    page?:string;
    facilities?:string[];
    type?:string[];
    stars?:string[];
    maxPrice?:string;
    sortOption?:string;
  }


  
export const searchHotels = async (searchParams: SearchParams):Promise<HotelSearchResponse> => {
  
  
  

    const queryParams= new URLSearchParams()
    queryParams.append("destination",searchParams.destination || "")
    queryParams.append("checkIn",searchParams.checkIn || "")
    queryParams.append("checkOut",searchParams.checkOut || "")
    queryParams.append("adultCount",searchParams.adultCount || "")
    
    queryParams.append("childCount",searchParams.childCount || "")
    queryParams.append("page",searchParams.page || "")
    queryParams.append("maxPrice",searchParams.maxPrice || "")
    queryParams.append("sortOption",searchParams.sortOption || "")

    searchParams.facilities?.forEach((facility)=> queryParams.append("facilities",facility || ""))
    searchParams.type?.forEach((type)=> queryParams.append("type",type || ""))
    searchParams.stars?.forEach((star)=> queryParams.append("stars",star || ""))
    
    

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`, {
      method: "GET",
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Failed to add hotel");
    }
  
    return response.json();
  };


  export const fetchHotelById=async(id:string):Promise<HotelType>=>{
    const response=await fetch(`${API_BASE_URL}/api/hotels/${id}`, {
        method: "GET",
        credentials: "include",
        
      });
      if (!response.ok) {
        throw new Error("Failed to Fetch hotel");
      }
    
      return response.json();
}

