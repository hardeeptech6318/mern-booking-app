import React, { useContext } from "react";

import { useQuery } from "react-query";
import { validateToken } from "../api-clients";



type AppContext={
    isLoggedIn:boolean;
}

 const AppContext=React.createContext<AppContext | undefined>(undefined)


 export const AppContextProvider=({children}:{children:React.ReactNode})=>{
       
    
    
    const {isError}=useQuery("validateToken",validateToken,{
        retry:false
    });

    return <AppContext.Provider value={{
            isLoggedIn:!isError
        }}>
            {children}
        </AppContext.Provider>
 };

 export  const useAppContext=()=>{
    const context=useContext(AppContext);
    return context as AppContext
 }