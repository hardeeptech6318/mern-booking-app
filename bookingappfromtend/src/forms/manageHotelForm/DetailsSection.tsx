import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"
import CountryStateCity from "./CountryStateCity"





function DetailsSection() {
    const {register,formState:{errors}}=useFormContext<HotelFormData>()
    
  
  return (
    <div className="flex flex-col gap-4">
        <h1 className=" text-3xl font-bold mb-3">Add Hotel</h1>
        <label className=" text-gray-700 text-sm font-bold flex-1">
          Name 
          <input 
          type="text"
          className=" border rounded w-full py-1 px-2 font-normal" {...register("name",{required:"This field is required"})}/>
          {errors.name && (
            <span className=" text-red-500">{errors?.name?.message}</span>
          )}
        </label>

            <CountryStateCity/>

            <label className=" text-gray-700 text-sm font-bold flex-1">
          Description 
          <textarea 
          rows={10}
          className=" border rounded w-full py-1 px-2 font-normal" {...register("description",{required:"This field is required"})}/>
          {errors.description && (
            <span className=" text-red-500">{errors?.description?.message}</span>
          )}
        </label>

        <label className=" text-gray-700 text-sm font-bold max-w[50%]">
          Price per night 
          <input 
          type="number"
          className=" border rounded w-full py-1 px-2 font-normal" {...register("pricePerNight",{required:"This field is required"})}/>
          {errors.pricePerNight && (
            <span className=" text-red-500">{errors?.pricePerNight?.message}</span>
          )}
        </label>

        
        <label className=" text-gray-700 text-sm font-bold max-w[50%]">
          Star rating
          <select
          className=" border rounded w-full p-2 text-gray-700 font-normal"
          {...register("startRating",{required:"This field is required"})}>
                <option value="" className="text-sm font-bold">Select as Rating</option>
                {[1,2,3,4,5].map((e:number)=>(<option key={e} value={e} className="text-sm font-bold">{e}</option>))}
          </select>
          {errors.startRating && (
            <span className=" text-red-500">{errors?.startRating?.message}</span>
          )}
        </label>

    </div>
  )
}

export default DetailsSection