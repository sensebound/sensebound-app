import { MouseEventHandler, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import SimpleLogo from "./SimpleLogo";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";




interface signCardInputs{   
    close: MouseEventHandler<HTMLButtonElement>
    swap: MouseEventHandler<HTMLButtonElement>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    
}

export default function SignInCard({ close , swap, setLoading}: signCardInputs){
    const [userInput, setuserInput] = useState("");
    const [passwordInput, setpasswordInput] = useState("");

    
    const navigate = useNavigate();

    const sendSignInRequest = async () => {
        
        try{
            setLoading(true)
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                user: userInput,
                password: passwordInput,

            })
 
            console.log(response)
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email)
            localStorage.setItem("user", response.data.user)
            localStorage.setItem("userId",response.data.user_id )
            localStorage.setItem("loggedIn", "true")
            setLoading(false)
            navigate("/profile")
        
        } catch(e){
            setLoading(false)
            toast.error("Invalid Email/Username/Password", {
                position: "top-center",
                autoClose: 5000, // Closes after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    }


   

   

    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                        
                        <div className="bg-slate-50 p-6 rounded-lg shadow-xl ">
                        
                               
                           <div className=" flex flex-row justify-center">
                                <div className="flex flex-col justify-center">
                                    <div className="flex flex-row  justify-between pb-[1vh]">
                                        
                                        <div  className="flex justify-center ">
                                        <SimpleLogo/>
                                        </div>

                                        <button onClick={close}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                                        </svg>
                                        </button>

                                        
                                    </div>
                                   
                                    <div className="font-bold text-xl ">Sign in</div>
                                    
                                    <div className="mb-6 mt-6">
                                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Username or Email</label>
                                        <input onChange={(e) => {
                                            setuserInput(e.target.value)
                                        }} placeholder="Enter username or email" type="text" id="signup-username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "/>
                                        
                                    </div>
                        
                                    <div className="mb-6">
                                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                        <input onChange={(e)=> {
                                            setpasswordInput(e.target.value)
                                        }} placeholder="*********" type="password" id="sign-up-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "/>
                                        
                                        <Link to="/forgot-password">
                                            <p className="text-gray-600 text-xs mt-[1vh] hover:underline">Forgot Password?</p>
                                        </Link>
                                    </div>
                                      

                                <div>
                                    
                                </div>
                                   
                                    
                                

                                    <button  onClick={sendSignInRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm mt-5 px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign in</button>
                                    
                                    <div className="text-gray-800 mt-3 flex justify-center">
                                         Dont have an account?<button onClick={swap} className="font-semibold text-gray-800 ml-1">Sign up.</button> 
                                    </div>

                                </div>

                           </div>
                                
                        
                        </div>

                        <div>
                            <ToastContainer/>
                        </div>
                        </div>
    )

}