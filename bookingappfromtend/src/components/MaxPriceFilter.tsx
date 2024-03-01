

type Props ={
    slectedPrice:string;
    onChange:(event:React.ChangeEvent<HTMLSelectElement>)=>void
}

function MaxPriceFilter({slectedPrice,onChange}:Props) {
    

    const price=["1000","2000","3000","4000"]

    return (
      <div className=" border-b border-slate-300 pb-3">
          <h4 className=" text-md font-semibold mb-2">Max Price</h4>
     <label>
                        <select onChange={onChange} value={slectedPrice} className=" border rounded w-full p-2 text-gray-700 font-normal">
                     
                        {price.map((price:string)=>(
                            <option key={price} value={price} >{price}</option>
                        ))}
                      

</select>
                      
                      </label>
           
      </div>
    )
  }


  export default MaxPriceFilter