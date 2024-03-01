import { hotelTypes } from "../config/hotel.options-config";

type Props ={
    selectedType:string[];
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
}

function TypeFilter({selectedType,onChange}:Props) {
    return (
      <div className=" border-b border-slate-300 pb-3">
          <h4 className=" text-md font-semibold mb-2">Hotel type</h4>
          {hotelTypes?.map((start:string)=>(
              <label key={start}  className=" flex items-center space-x-2">
                      <input type="checkbox" className=" rounded " value={start} checked={selectedType.includes(start)}
                      onChange={onChange}
                      /> 
                      <span>{start}</span>
              </label>
          ))}
      </div>
    )
  }


  export default TypeFilter