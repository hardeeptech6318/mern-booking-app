import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"
import { hotelFacilities } from "../../config/hotel.options-config"


function FacilitiesSection() {
    const {register,formState:{errors}}=useFormContext<HotelFormData>()
    
  return (
    <div>
        <h2 className=" text-2xl  font-bold mb-3">Facilitis</h2>
        <div className=" grid grid-cols-5 gap-3">
            {hotelFacilities.map((e:string)=>(
                <label className="text-sm flex gap-1 text-gray-700" key={e}>
                    <input type="checkbox" value={e} {...register("facilities",{
                        validate:(facility)=>{
                            if(facility && facility.length >0){
                                return true
                            }else{
                                return "At least one facility is required"
                            }
                        }
                    })}/>
                    {e}
                </label>
            ))}
        </div>
        {errors.facilities && (
        <span className=' text-red-500 text-sm font-bold'>{errors.facilities.message}</span>
    )}
    </div>
  )
}

export default FacilitiesSection