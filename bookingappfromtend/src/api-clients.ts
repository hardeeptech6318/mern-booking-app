
import { RegisterFormData } from "./pages/Register";
import { LoginFormData } from "./pages/SignIn";
const API_BASE_URL =import.meta.env.VITE_API_BASE_URL || '';

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

