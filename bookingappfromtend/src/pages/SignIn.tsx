import { useForm } from "react-hook-form"
import { useMutation } from "react-query";
import { signIn } from "../api-clients";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export type LoginFormData={
  email:string;
  password:string;
}


function SignIn() {

  const navigate=useNavigate()

  const {register,handleSubmit,formState:{errors}}=useForm<LoginFormData>()

  const mutation =useMutation(signIn,{
    onSuccess:()=>{
      navigate("/")
      toast.success("Login Success!")
    
  },
    onError:(errors:Error)=>{
        toast.error(errors.message)
    }
    
    
  })
  
  const onSubmit=handleSubmit((data)=>{
      mutation.mutate(data)
  })
  return (
<form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">
            Sign In
        </h2>

   

      <label className=" text-gray-700 text-sm font-bold flex-1">
          Email 
          <input 
          type="email"
          className=" border rounded w-full py-1 px-2 font-normal" {...register("email",{required:"This field is required"})}/>
          {errors.email && (
            <span className=" text-red-500">{errors.email.message}</span>
          )}
        </label>

        <label className=" text-gray-700 text-sm font-bold flex-1">
          Password
          <input 
          type="password"
          className=" border rounded w-full py-1 px-2 font-normal" {...register("password",{required:"This field is required",minLength:{value:6,message:"Password must be atleast 6 character long"}})}/>
          {errors.password && (
            <span className=" text-red-500">{errors.password.message}</span>
          )}
        </label>


        <span className=" flex items-center justify-between">
          <span className=" text-sm">

            Not Registered <Link to="/register" className=" underline" >Create an account here</Link>

          </span>

          <button type="submit" className=" bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">Login</button>
          
        </span>

        

</form>
  )
}

export default SignIn