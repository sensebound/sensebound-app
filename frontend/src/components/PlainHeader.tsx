
import Logo from "./Logo"




export default function PlainHeader(){

    return <nav className="h-[9vh] w-screen-full bg-slate-50  flex ">
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-row  px-[10vw] md:px-[25vw] lg:px-[30vw] mt-5  bg-slate-50 ">
                            <Logo link={"/landing"}/>
                                            
                           
                                
                        </div>

                        
                            
                        </div>
                       
                    
                
         </nav>
}