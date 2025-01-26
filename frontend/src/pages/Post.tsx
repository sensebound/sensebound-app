import { useLocation, useNavigate} from "react-router-dom";
import FullEntryCard from "../components/FullEntryCard";



export function Post(){
    const location = useLocation();
    const navigate = useNavigate();
    

    return (
        <div className="w-full h-screen  bg-slate-50">

            <div className="font-anton text-xl font-extralight flex justify-center pt-[3vh] pb-[10vb]">
                    Sensebound
            </div>


            <div className="px-[10vw] md:px-[25vw] lg:px-[30vw] mt-5 bg-slate-50">

            <FullEntryCard username={location.state.user} datePosted={location.state.date} text={location.state.text} wordOfTheDay={location.state.word}/>

            </div>
            <div className="flex justify-center mt-[5vh]">

            <button className="border-[1px] bg-black ml-[2vw] text-sm md:text-md  text-black text-slate-50 border-black rounded-2xl px-4 py-1 flex" onClick={()=>{
                navigate(-1)
            }}>
                {"Go Back"}
            </button>
            
            </div>

            
        </div>
    )
}