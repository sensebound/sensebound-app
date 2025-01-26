import PostHeader from "../components/PostHeader";
import DisplayEntries from "../components/DisplayEntries";
import ProfileNavbar from "../components/ProfileNavbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";






export default function UserPage(){

    const location = useLocation();
    
    return <>
        (
            <div className="w-full h-screen mt-[6vh] bg-slate-50">
                <ProfileNavbar />
                <PostHeader text={location.state.user} user={true}/>
                <DisplayEntries community={false} path={`/writings/user/${location.state.user}`}/>
                <Footer/>
            </div>)
        
           </>

}
