import { useEffect, useState } from "react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";




import { UserIcon } from "./UserIcon";
import HandleOutsideClick from "./HandleOutsideClick";



export default function ProfileNavbar(){

    const [user,setUser] = useState<string>("");

    const [dropdown, setDropdown] = useState<boolean>(false);

    const navigate = useNavigate();


    const ref = HandleOutsideClick(()=>{
        setDropdown(false)
    })
    
    

    useEffect(()=>{
        const user : any = localStorage.getItem("user");
        setUser(user)
    },[])


  

    return (
        <div  className="h-[9vh] fixed top-0 left-0 bg-slate-50 w-full flex border-b-[1px] justify-between z-50">
            <div className="ml-[5vw] flex flex-col justify-center ">
                <Logo link={"/profile"}/>
            </div>



            <div className="flex flex-col justify-center mr-[10vw] ">
                        <div className="flex-row justify-between md:flex">
                            <div className="hidden md:flex md:mr-[5vw] md:flex-col md:justify-center md:border-[1px] md:px-5 md:rounded-lg md:border-black shadow-md bg-slate-50">
                                <Link to={"/editor"}>

                                    <div >
                                        < div className="font-semibold mr-[5px]">
                                            Write
                                        </div>

                                        
                                    </div>
                               
                                
                                </Link>
                                
                            </div>

                    

                        <div>

                            <button onClick={()=>{
                                setDropdown(!dropdown)
                            } }  className="text-white z-20 bg-black border rounded-lg hover:bg-gray-800  text-sm px-2.5 py-2.5 text-center" type="button">
                                <UserIcon/>
                            </button>

                            { dropdown && <div ref={ref}  className="z-10  fixed bg-white divide-y divide-gray-100 text-black rounded-lg right-10 md:right-7 lg:top-15 shadow w-44 ">
                                <div className="p-2 flex justify-center bg-slate-100 text-sm font-semibold border-b">
                                {user}
                                </div>
                                
                                <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownDelayButton">


                                <li className="md:hidden">
                                <Link to={'/editor'}>
                                    <div className="block px-4 py-2 hover:bg-gray-300 ">
                                       
                                            <div className="flex flex-row justify-between">
                                            <div>
                                                Write
                                            </div>

                                            <div className="flex flex-row justify-between mr-2">
                                                + 
                                            </div>

                                        </div>  
                                        
                                    </div>
                                </Link>

                                </li>
                                <li>
                                    <div className="block px-4 py-2 hover:bg-gray-300  ">
                                        <Link to={'/profile'}>
                                            <div className="flex flex-row justify-between">
                                                <div>
                                                Community Feed
                                                </div>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                                                    </svg>
                                                </div>

                                            </div>                            
                                        </Link>
                                    </div>

                                </li>
                                <li>
                                    <div className="block px-4 py-2 hover:bg-gray-300  ">
                                        <Link to={'/stats'}>
                                            <div className="flex flex-row justify-between">
                                                <div>
                                                Stats
                                                </div>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                                                    </svg>
                                                </div>

                                            </div>                            
                                        </Link>
                                    </div>

                                </li>
                                <li>
                                    <div className="block px-4 py-2 hover:bg-gray-300  ">
                                       <button className="w-full" onClick={ ()=>{
                                            navigate('/userProfile', {state:{user:user}})
                                       }
                                       }>
                                        <div className="flex flex-row justify-between">
                                            <div>
                                            My Entries
                                            </div>

                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                </svg>
                                            </div>

                                        </div>
                                        
                                        

                                            

                                        </button>
                                    </div>

                                </li>

                                
                            
                                <li>
                                    <div className="block px-4 py-2 hover:bg-gray-300  ">
                                       
                                        <button className="w-full" onClick={()=>{
                                            localStorage.clear()
                                            navigate('/')
                                        }}>
                                            <div className="flex flex-row justify-between items-center">
                                                <span>
                                                Signout
                                                </span>
                                                
                                    

                                                <div >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                                    </svg>
                                                </div>
                                                

                                            </div>
                                        </button>
    
                                       
                                    </div>

                                </li>

                                
                                </ul>
                            </div> }



                        </div>

                        </div>
           



                
            </div>

            


           
        </div>
    )
}