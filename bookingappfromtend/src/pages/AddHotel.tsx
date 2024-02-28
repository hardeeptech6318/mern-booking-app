import { useMutation } from "react-query"
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm"
import { addMyHotel } from "../api-clients"
import toast from "react-hot-toast"


function AddHotel() {
  const {mutate,isLoading}=useMutation(addMyHotel,{
    onSuccess:()=>{toast.success("Hotel Saved!")},
    onError:(error:Error)=>{toast.error(error.message)}
  })

  const handleSave=(hotelFormData:FormData)=>{
   
    
      mutate(hotelFormData)
  }

  return (<ManageHotelForm onSave={handleSave} isLoading={isLoading}/> )
}

export default AddHotel