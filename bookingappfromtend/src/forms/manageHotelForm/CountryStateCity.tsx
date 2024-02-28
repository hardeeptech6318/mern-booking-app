import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"
import { Country, State, City, ICountry, IState, ICity }  from 'country-state-city';





function CountryStateCity() {
    const {register,watch,formState:{errors}}=useFormContext<HotelFormData>()
    const countrywatch=watch("country")
    const statewatch=watch("state")
    
  return (
    <div className=" flex gap-4">
            

        <label className=" text-gray-700 text-sm font-bold flex-1">
          country
          <select
          className=" border rounded w-full p-2 text-gray-700 font-normal"
          {...register("country",{required:"This field is required"})}>
                <option value="" className="text-sm font-bold">Select as Country</option>
                {Country?.getAllCountries()?.map((country:ICountry)=>{
                
                return <option key={country.name} value={country.isoCode} className="text-sm font-bold">{country.name}</option>})}
          </select>
          {errors.startRating && (
            <span className=" text-red-500">{errors?.country?.message}</span>
          )}
        </label>


<label className=" text-gray-700 text-sm font-bold flex-1 ">
State
          <select
          className=" border rounded w-full p-2 text-gray-700 font-normal"
          {...register("state",{required:"This field is required"})}>
                <option value="" className="text-sm font-bold">Select as State</option>
                {State.getStatesOfCountry(countrywatch)?.map((state:IState)=>{
                
                return <option key={state.name} value={state.isoCode} className="text-sm font-bold">{state.name}</option>})}
          </select>
          {errors.city && (
            <span className=" text-red-500">{errors?.city?.message}</span>
          )}
        </label>



        <label className=" text-gray-700 text-sm font-bold flex-1 ">
City
          <select
          className=" border rounded w-full p-2 text-gray-700 font-normal"
          {...register("city",{required:"This field is required"})}>
                <option value="" className="text-sm font-bold">Select as City</option>
                { City.getCitiesOfState(countrywatch, statewatch)?.map((city:ICity)=>{
                
                return <option key={city.name} value={city.name} className="text-sm font-bold">{city.name}</option>})}
          </select>
          {errors.city && (
            <span className=" text-red-500">{errors?.city?.message}</span>
          )}
        </label>
      





            </div>
  )
}

export default CountryStateCity