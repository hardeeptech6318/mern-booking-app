import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";


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
lastUpdated:Date;
}

type Props ={
  onSave:(hotelFormData:FormData)=>void;
  isLoading:boolean
}



function ManageHotelForm({onSave,isLoading}:Props) {

  const formMethods=useForm<HotelFormData>()
  const {handleSubmit}=formMethods;

  

  const onSubmit=handleSubmit((data:HotelFormData)=>{
      // console.log(data);
      const formdata= new FormData();
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