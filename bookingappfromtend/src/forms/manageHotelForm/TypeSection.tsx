
import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'
import { hotelTypes } from '../../config/hotel.options-config'

function TypeSection() {
    const {register,watch,formState:{errors}}=useFormContext<HotelFormData>()
    const typewatch=watch("type")
  return (
    <div>
        <h2 className='text-2xl font-bold mb-3'>Type</h2>
    <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
        {hotelTypes.map((type:string)=>(
            <label className={`cursor-pointer  text-sm rounded-full px-4 py-2 font-semibold ${ typewatch===type ?"bg-blue-300":"  bg-gray-300"}` }>
                <input type='radio' className='hidden' value={type} {...register("type",{required:"This field is required"})}/>
                <span>
                    {type}
                </span>
            </label>
        ))}

    </div>
    {errors.type && (
        <span className=' text-red-500 text-sm font-bold'>{errors.type.message}</span>
    )}
    </div>
  )
}

export default TypeSection