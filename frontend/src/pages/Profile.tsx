import PostHeader from "../components/PostHeader";
import DisplayEntries from "../components/DisplayEntries";
import ProfileNavbar from "../components/ProfileNavbar";
import Footer from "../components/Footer";
import { useState } from "react";
import DeletePopUp from "../components/DeletePopUp";
import Loader from "../components/Loader";



export default function Profile(){

        const [deleteAccountPopUp, setDeleteAccountPopUp] = useState(false);
        const [userId, setUserId] = useState("");
        const [loading, setLoading] = useState(false)
    
     
    
        interface deleteHandlerInput{
            id: string
        }
    
        const deleteAccountHandler = ({id}:deleteHandlerInput) => {
            setUserId(id);
            setDeleteAccountPopUp(!deleteAccountPopUp)
        }
    

    return <>
        (
            <div className="w-full h-screen mt-[6vh] bg-slate-50">
                <ProfileNavbar handler={deleteAccountHandler}/>       
                <PostHeader text="Community Feed" />
                <DisplayEntries  path="/writings"/>
                <Footer/>
            </div>  
            )
        
             {deleteAccountPopUp && <DeletePopUp deletePost={false} loading={setLoading} userId={userId} handler={deleteAccountHandler}/>}
             {loading && <Loader/>}
    </>

}
