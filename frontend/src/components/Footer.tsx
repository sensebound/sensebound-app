import { Link, useNavigate } from "react-router-dom"


export default function Footer(){
    const navigate = useNavigate();

        function handleHome(){
            const isLoggedIn = localStorage.getItem('loggedIn')
            isLoggedIn ? navigate('/profile'): navigate('/')
        }
    return <footer className="flex justify-center text-xs lg:text-base flex-col  min-w-full h-[7vh] border-t-[1px] border-black  bg-black lg:bg-slate-50 fixed bottom-0">
                <div className="flex flex-row pl-[4vw] lg:justify-center">
                    <div className="flex text-xs text-gray-400  lg:text-black">

                        
                        <button onClick={handleHome} className="mr-3 hover:underline hover:cursor-pointer">Home</button>
                        

                        <Link to={'/privacy'}>
                            <div className="mr-3 hover:underline hover:cursor-pointer">Privacy</div>
                        </Link>
                        
                        <Link to={'/terms'}>
                            <div className="mr-3 hover:underline hover:cursor-pointer">Terms</div>
                        </Link>
                        
                        <Link to={'/feedback'}>
                            <div className="mr-3 hover:underline hover:cursor-pointer">Feedback</div>
                        </Link>

                        <Link to={'/guide'}>
                            <div className="mr-3 hover:underline hover:cursor-pointer">Guide</div>
                        </Link>
                        
                        <div className="text-gray-500"> &#169; Sensebound</div>

                    </div>

                    
                    
                  

                </div>

           </footer>
}