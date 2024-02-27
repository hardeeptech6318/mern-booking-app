import { RegisterFormData } from "./pages/Register";
import { LoginFormData } from "./pages/SignIn";
const API_BASE_URL =import.meta.env.VITE_API_BASE_URL || '';

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