import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"


function ImageSection() {
    const {register,formState:{errors}}=useFormContext<HotelFormData>()
  return (
    <div>
        <h2 className=" text-2xl  font-bold mb-3">Images</h2>
        <div className="border rounded p-4 flex flex-col gap-4">
            <input 
            multiple
            accept="image/*"
            className=" w-full text-gray-700 font-normal"
            type="file" {...register("imageFiles",{
                validate:(image)=>{
                    const totalLenght=image.length;
                    if(totalLenght===0){
                        return "At least one image is required"
                    }
                    if(totalLenght > 6){
                        return " Total number of image cannot exceed 6"
                    }
                    return true
                }
            })}/>
            {errors.childCount && (
            <span className=" text-red-500">{errors?.imageFiles?.message}</span>
          )}
        </div>
    </div>
  )
}

export default ImageSection