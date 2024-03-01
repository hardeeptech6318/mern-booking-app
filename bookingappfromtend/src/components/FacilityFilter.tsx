import { hotelFacilities } from "../config/hotel.options-config";

type Props ={
    selectedFacility:string[];
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
}

function FacilityFilter({selectedFacility,onChange}:Props) {
    

    return (
      <div className=" border-b border-slate-300 pb-3">
          <h4 className=" text-md font-semibold mb-2">Facility type</h4>
          {hotelFacilities?.map((start:string)=>(
              <label key={start}  className=" flex items-center space-x-2">
                      <input type="checkbox" className=" rounded " value={start} checked={selectedFacility.includes(start)}
                      onChange={onChange}
                      /> 
                      <span>{start}</span>
              </label>
          ))}
      </div>
    )
  }


  export default FacilityFilter