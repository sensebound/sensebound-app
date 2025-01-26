import { MouseEventHandler, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import SimpleLogo from "./SimpleLogo";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




interface signUpCardInputs{   
    close: MouseEventHandler<HTMLButtonElement>
    swap: MouseEventHandler<HTMLButtonElement>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    
}







export default function SignUpCard({close, swap,setLoading}: signUpCardInputs){
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [emailInput, setEmailInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
    
    

    const navigate = useNavigate();



    const sendRequest = async () => {

        

        const doPasswordsMatch = (passwordInput === confirmPasswordInput);


        
        if(doPasswordsMatch){

                try{
                    setLoading(true);
                    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
                        username: usernameInput,
                        email: emailInput,
                        password_hash: passwordInput
                    });
                    const token = response.data.token
                    console.log(token)

                    localStorage.setItem("user", usernameInput)
                    localStorage.setItem("token", token)
                    localStorage.setItem("loggedIn", "true")
                    localStorage.setItem("userId", response.data.user_id)
                    setLoading(false);
                    navigate('/profile')
                  
                } catch(e){
                    setLoading(false)
                    toast.error("Error: Enter valid inputs and make sure your email and username hasn't been used before.", {
                        position: "top-center",
                        autoClose: 5000, // Closes after 3 seconds
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "dark",
                    });
                    
                }
                


            
         
        } else (

            toast.error("Passwords don't match.", {
                position: "top-center",
                autoClose: 5000, // Closes after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            })
        )
            
    }
     

    

    return (
        <div  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                        <div className="bg-slate-50 p-6 rounded-lg shadow-xl ">
                           <div className=" flex flex-row justify-center w-80">
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
                                   
                                    <div className="font-bold text-xl">Create an Account.</div>
                                    
                                    <div className="mb-6 mt-6">
                                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                                        <input onChange={(e)=> {
                                            setUsernameInput(e.target.value)
                                        }} placeholder="eg. gatormcfly" type="text" id="signup-username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "/>
                                        
                                    </div>
                                    <div className="mb-6">
                                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                        <input onChange={ (e)=> {
                                            setEmailInput(e.target.value)
                                        }
                                        } placeholder="eg. gatormcfly@gmail.com" type="text" id="signup-email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "/>
                                        
                                    </div>
                                    <div className="mb-6">
                                        <label  className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                        <input onChange={(e)=> {
                                            setPasswordInput(e.target.value)
                                        }}placeholder="*********" type="password" id="sign-up-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "/>
                                        
                                    </div>
                                        <div className="mb-6">
                                            <label  className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                                            <input onChange={(e)=> {
                                                setConfirmPasswordInput(e.target.value)}}placeholder="*********" type="password" id="signup-confirm-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "/>
                                            
                                        </div>

                                <div>
                                    
                                </div>
                                   
                                    
                                   

                                    <div className="text-xs font-light text-gray-600 mt-3 flex justify-center text-center">
                                    Click “Sign up” to agree to Sensebound’s Terms of Service and acknowledge that Sensebound’s Privacy Policy applies to you.
                                    </div>

                                    <button onClick={
                                        () => {
                                            sendRequest();
                                        }
                                    }   type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm mt-5 px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign up</button>
                                    
                                    <div className="text-gray-800 mt-3 flex justify-center">
                                         Already have an account?<button onClick={swap} className="font-semibold text-black ml-1">Sign in.</button> 
                                    </div>

                                </div>


                           </div>
                            <div>
                                <ToastContainer/>
                            </div>
                        
                        </div>
                        </div>
    )

}


