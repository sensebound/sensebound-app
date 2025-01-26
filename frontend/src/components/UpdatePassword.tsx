import PlainHeader from "../components/PlainHeader"
import Footer from "../components/Footer"
import {useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


interface UpdatePasswordInputs {
    userid: string
}

export default function UpdatePassword({userid} : UpdatePasswordInputs){

        const [newPassword, setNewPassword] = useState<string>("");
        const [confirmPassword, setConfirmPassword] = useState<string>("");
        const [success, setSucess] = useState<boolean>(false);
        const navigate = useNavigate();

        const updatePassword = async () => {

            if(newPassword === confirmPassword){
                const resetUrl = BACKEND_URL + `/api/v1/user/update-password/${userid}`
                const response = await axios.put(resetUrl,{
                    password: newPassword
            })  

            if(response){
                setSucess(true)
            } 
            }

        }        


      

    return (
        <div className="w-full h-screen   bg-slate-50">
                <PlainHeader/>
                <div className="font-bold text-lg pt-[5vh] px-[10vw] md:px-[25vw] lg:px-[30vw] mt-5 bg-slate-50">
                 {'Reset Password'}
                 <hr className="my-6 h-0.5 border-t-0 bg-neutral-200" />

                {!success ? <div>
                    
                    <div >
                    <p className="mb-[1vh] text-md font-normal">Enter New Password</p>
        
                        <input className=" focus:border-black rounded-lg" type="password" onChange={(e)=>{
                            setNewPassword(e.target.value)
                        }}/>
                    </div>

                    <div className="mt-[2vh]">
                    <p className="mb-[1vh] text-md font-normal ">Confirm New Password</p>
                        <input className="focus:border-black rounded-lg" type="password" onChange={(e)=>{
                            setConfirmPassword(e.target.value)
                        }}/>
                    </div>

                    <button className="mt-[4vh] px-5 py-2 bg-black rounded text-slate-50 font-medium focus:bg-gray-700 rounded-full" onClick={ ()=>{
                            updatePassword();
                            
                    }
                        
                    }>
                        Update Password
                    </button>
                </div> 
                
                : <div>

                    
                </div> 
                
                }

                
                

                {success && 
                    (<div className="mt-[3vh] text-md font-semibold text-gray-600">
                       <p>Your password has been reset.</p>

                       <button className="font-bold px-5 py-2 bg-black text-slate-50 rounded-full mt-[3vh]" onClick={()=>{
                        navigate('/')
                       }}>Go Home</button>

                       
                    </div>)
                }

                </div> 

                
                <Footer/>
        </div>
    )
}