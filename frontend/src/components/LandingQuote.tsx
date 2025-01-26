import { MouseEventHandler } from "react"

interface LandingQuoteInputs {
    handleSignInPopUp: MouseEventHandler<HTMLButtonElement>
    handleWord: MouseEventHandler<HTMLButtonElement>
}

export default function LandingQuote({handleSignInPopUp, handleWord}: LandingQuoteInputs){

    return <div className="w-full-screen flex justify-center">
                <div className=" flex flex-row justify-center md:justify-start min-w-[90vw] md:min-w-[80vw] lg:min-w-[65vw]">
                    <div className="flex flex-col justify-center mt-[26vh]">
                        <div className="w-full  sm:font-normal flex flex-col jutify-start">
                            <p className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-800">
                                    Wake up.
                            </p>
                            
                            
                            <p className="mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl  font-serif text-slate-800 z-index-200">
                                Dive into your senses.
                            </p>
                        

                            <p className="flex justify-start font-light ml-1 sm:ml-0 tracking-wide text-gray-500 mt-[5vh] text-lg md:text-xl lg:text-2xl font-extralight font-roboto">
                                10 minutes, every morning.
                            </p>
                        </div>
                        

                        <div className="mt-[7vh] lg:mr-5 flex">

                        <button onClick={handleSignInPopUp} className="bg-black text-amber-50 text-2  sm:ml-0 transition-all transition-duration-1000 px-10 py-2 sm:py-3  md:px-12 md:py-3 rounded-full text-xs font-bold">Start writing</button>

                         <button onClick={handleWord} className="bg-slate050 text-black-50 border-[1px] ml-[1vh] border-black text-2  transition-all transition-duration-1000 px-8 py-1  rounded-full text-xs font-bold sm:hidden">Word of the day</button>  

                        
                        
                         
                       
                        </div>
                            
                        

                    </div>
                </div>
               
        </div>
}