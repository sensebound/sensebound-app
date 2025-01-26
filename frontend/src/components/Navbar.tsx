

import  { MouseEventHandler } from "react"
import Logo from "./Logo"

// need to comment code properly 
interface LandingNavbarInputs {
    handleSignUpPop: MouseEventHandler<HTMLButtonElement>
    handleSignInPop: MouseEventHandler<HTMLButtonElement>
    handleWordOfTheDay: MouseEventHandler<HTMLButtonElement>
}

export default function LandingNavbar({handleSignInPop, handleSignUpPop, handleWordOfTheDay}: LandingNavbarInputs){

    return <nav className="h-[9vh] w-screen-full bg-slate-50 border-b-[1px] border-black flex flex-row justify-center">
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-row  min-w-[90vw] md:min-w-[80vw] lg:min-w-[65vw] justify-between">
                            <Logo link={"/"}/>
                                            
                            <div>
                                <ul className="flex flex-row space-x-4">
                                        
                                        <li className="flex flex-col justify-center hidden sm:flex">
                                            <button className="text-sm" onClick={handleWordOfTheDay}>
                                                Word of the day
                                            </button>
                                        </li>
                                        <li  className="flex flex-col justify-center hidden md:flex">
                                            <button className="text-xs sm:text-sm" onClick={handleSignInPop}>
                                                Sign in
                                            </button>
                                        </li>
                                        <li >
                                        <button onClick={handleSignUpPop} className="bg-black text-amber-50  hover:text-slate-50 transition-all transition-duration-1000  px-3.5 py-3 rounded-full text-xs ml-[1vw] font-bold">Get started</button>
                                        </li>
                                        
                                    </ul>

                            </div>
                                
                        </div>
                           
                            
                        </div>
                       
                    
                
         </nav>
}