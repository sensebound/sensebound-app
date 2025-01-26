import PlainHeader from "../components/PlainHeader"
import Footer from "../components/Footer"
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export default function(){

        const [email, setEmail] = useState<string>("");
        const [success, setSucess] = useState<boolean>(false);
        
        
        const navigate = useNavigate();

        

        const sendResetEmail = async () => {

            try{

                if(email.length != 0){
                    const resetUrl = BACKEND_URL + "/api/v1/user/password-reset"
                    const response = await axios.post(resetUrl, {
                    email: email
                })
    
                if(response){
                    setSucess(true)
                } 
                }

            } catch(err){

                            toast.error("Invalid Email!", {
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
        <div className="w-full h-screen   bg-slate-50">
                <PlainHeader/>
                <div className="font-bold text-lg pt-[5vh] px-[10vw] md:px-[25vw] lg:px-[30vw] mt-5 bg-slate-50">
                 {'Forgot Password'}
                 <hr className="my-6 h-0.5 border-t-0 bg-neutral-200" />

                {!success ? <div>
                    <p className="mb-[1vh] text-md font-normal">Enter your email</p>
                    <div >
                        <input className="focus:border-black rounded mt-[1vh]" type="text" onChange={(e)=>{
                            setEmail(e.target.value)
                        }}/>
                    </div>

                    <button className="mt-[4vh] px-5 py-2 bg-black rounded text-slate-50 font-medium focus:bg-gray-700" onClick={ ()=>{
                            sendResetEmail()
                            
                    }
                        
                    }>
                        Reset Password
                    </button>
                </div> 
                
                : <div></div> 
                
                }
                
                
                

                {success && 
                    (<div className="mt-[3vh] text-md font-semibold text-gray-600">
                        An email has been sent to your account. If you haven't recieved it. <button className="text-gray-900" onClick={()=>{
                            navigate(0)
                        }
                    }>Click here</button>
                    </div>)
                }

                </div> 
                <Footer/>

                <div>
                    <ToastContainer/>
                </div>
        </div>
    )
}