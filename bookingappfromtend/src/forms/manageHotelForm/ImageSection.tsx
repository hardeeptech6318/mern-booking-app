import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"


function ImageSection() {
    const {register,watch,setValue,formState:{errors}}=useFormContext<HotelFormData>()
    const existingImage=watch("imageUrls")

    const handleDelete=(event:React.MouseEvent<HTMLButtonElement,MouseEvent>,imageUrl:string)=>{
      event.preventDefault()  
      setValue("imageUrls",existingImage.filter((url)=>{
       return url !== imageUrl
      }))
      
    }
    return (
    <div>
        <h2 className=" text-2xl  font-bold mb-3">Images</h2>
        <div className="border rounded p-4 flex flex-col gap-4">
          {existingImage && (
            <div className=" grid grid-cols-6 gap-4">
              {existingImage.map((e:string)=>(
                <div key={e} className=" relative group">
                  <img src={e} className="min-h-full object-cover"/>
                  <button onClick={(event)=>handleDelete(event,e)} className=" absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">Delete</button>
                </div>
              ))}
              </div>
          )}
            <input 
            multiple
            accept="image/*"
            className=" w-full text-gray-700 font-normal"
            type="file" {...register("imageFiles",{
                validate:(image)=>{
                  console.log(image);
                  
                    const totalLenght=image.length + existingImage?.length || 0;
                    if(totalLenght===0){
                        return "At least one image is required"
                    }
                    if(totalLenght > 6){
                        return " Total number of image cannot exceed 6"
                    }
                    return true
                }
            })}/>
            {errors.imageFiles && (
            <span className=" text-red-500">{errors?.imageFiles?.message}</span>
          )}
        </div>
    </div>
  )
}

export default ImageSection