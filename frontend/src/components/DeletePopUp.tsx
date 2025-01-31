
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { Dispatch, SetStateAction } from "react"
interface deletePopUpInput{
    message: string
    handler: ({userId}: {userId:string}) => void
    userId: string
    loading: Dispatch<SetStateAction<boolean>>
}

export default function DeletePopUp({message, handler, userId, loading}: deletePopUpInput){

    const navigate = useNavigate();

 
    const handleDelete = async () => {
        loading(true)
        console.log("From Delete Pop Component:", userId);
        const response = await axios.delete(`${BACKEND_URL}/api/v1/writings/deletePost/` + userId,
            {
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }
        )
        navigate('/profile')
        loading(false);
    }

    return <div  className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-60">
           <div className="bg-slate-50 p-6 rounded-lg shadow-xl">
            <div className="flex flex-col justify-end w-80">
                    

                <div className="h-40 flex flex-col justify-center items-center">
                            <p className="text-md  font-anton font-light  mt-3 flex justify-center text-center">
                                {message}
                            </p>          
                </div>

                <div className="flex flex-row justify-evenly w-80">
                                <button onClick={()=>handleDelete()} className="bg-black text-sm text-white px-5 py-2 rounded-2xl shadow-md hover:bg-gray-9">
                                    Confirm
                                </button>

                                <button onClick={()=> handler({userId:""})} className="bg-black text-sm text-white px-5 py-2 rounded-2xl shadow-md hover:bg-gray-9">
                                    Cancel
                                </button> 
                </div>
            </div>
        </div>
    </div>
}