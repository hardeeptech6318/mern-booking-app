import { useMutation, useQueryClient } from "react-query"
import { signOut } from "../api-clients"
import toast from "react-hot-toast"


function SignOutButton() {
    const queryClient=useQueryClient();
    const mutation=useMutation(signOut,{
        onSuccess:async()=>{toast.success('logout successfully');
        await queryClient.invalidateQueries("validateToken")
      },
        onError:(error:Error)=>{toast.error(error.message)}
    })

    const handleSubmit=()=>{
        
        
        mutation.mutate()
    }

  return (
    <button onClick={handleSubmit} className=" text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 rounded">Sign Out</button>
  )
}

export default SignOutButton