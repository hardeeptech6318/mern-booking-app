import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { fetchMyHotelsById, updateMyHotelById } from "../api-clients"
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm"
import toast from "react-hot-toast"


function EditHotel() {
    const {hotelId}=useParams()

    const {mutate,isLoading}=useMutation(updateMyHotelById,{
        onSuccess:()=>{toast.success("Updated Successfully")},
        onError:(e:Error)=>{toast.error(e.message)}
    })

    const onSave=(hotelFormData:FormData)=>{
        mutate(hotelFormData)
    }
   
    const {data:hotel}=useQuery("fetchMyHotelById",()=>fetchMyHotelsById(hotelId || ""),{
        enabled:!!hotelId
    })
  return (
    <ManageHotelForm onSave={onSave} hotel={hotel} isLoading={isLoading}/>
  )
}

export default EditHotel