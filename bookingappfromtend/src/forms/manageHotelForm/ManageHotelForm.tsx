import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";
import { HotelType } from "../../api-clients";
import { useEffect } from "react";


export type HotelFormData={
name:string;
city:string;
state:string;
description:string;
country:string;
type:string;
adultCount:number;
childCount:string;
facilities:string[];
pricePerNight:number;
startRating:number;
imageFiles:FileList;
imageUrls:string[];
lastUpdated:Date;
}

type Props ={
  hotel?:HotelType
  onSave:(hotelFormData:FormData)=>void;
  isLoading:boolean
}



function ManageHotelForm({onSave,isLoading,hotel}:Props) {

  const formMethods=useForm<HotelFormData>()
  const {handleSubmit,reset}=formMethods;

  useEffect(()=>{
    reset(hotel)
  },[hotel,reset])

  const onSubmit=handleSubmit((data:HotelFormData)=>{
    const formdata= new FormData();
    if(hotel){
      formdata.append("hotelId",hotel._id)
    }

      
      formdata.append("name",data.name)
      formdata.append("city",data.city)
      formdata.append("country",data.country)
      formdata.append("description",data.description)
      formdata.append("type",data.type)
      formdata.append("pricePerNight",data.pricePerNight.toString())
      formdata.append("startRating",data.startRating.toString())
      formdata.append("adultCount",data.adultCount.toString())
      formdata.append("childCount",data.childCount.toString())
      formdata.append("state",data.state)
      
      data.facilities.forEach((e:string,i:number)=>{
        return formdata.append(`facilities[${i}]`,e)
      })

      console.log(data.imageUrls);
      
      if(data?.imageUrls){
        data.imageUrls.forEach((url:string,index:number)=>{
        return  formdata.append(`imageUrls[${index}]`,url)
        })
      }

      Array.from(data.imageFiles).forEach((image)=>{
        formdata.append("imageFiles",image)
      })

      onSave(formdata)
   
  }) 

  return (
    <FormProvider {...formMethods}>
    <form className=" flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection/>
        <TypeSection/>
        <FacilitiesSection/>
        <GuestSection/>
        <ImageSection/>
        <span className="flex justify-end">
            <button disabled={isLoading} type="submit" className=" bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"> Save</button>
        </span>
    </form>
    </FormProvider>
  )
}

export default ManageHotelForm