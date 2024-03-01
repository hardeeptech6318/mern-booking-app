type Props ={
    selectedStars:string[];
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
}

function StarRatingFilter({selectedStars,onChange}:Props) {
  return (
    <div className=" border-b border-slate-300 pb-3">
        <h4 className=" text-md font-semibold mb-2">Property Rating</h4>
        {["5","4","3","2","1"]?.map((start:string)=>(
            <label key={start}  className=" flex items-center space-x-2">
                    <input type="checkbox" className=" rounded " value={start} checked={selectedStars.includes(start)}
                    onChange={onChange}
                    /> 
                    <span>{start} Stars</span>
            </label>
        ))}
    </div>
  )
}

export default StarRatingFilter