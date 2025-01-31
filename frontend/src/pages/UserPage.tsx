import PostHeader from "../components/PostHeader";
import DisplayEntries from "../components/DisplayEntries";
import ProfileNavbar from "../components/ProfileNavbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import DeletePopUp from "../components/DeletePopUp";
import Loader from "../components/Loader";


export default function UserPage(){

    const location = useLocation();
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false)

 
    const message = 'Are you sure you want to delete this entry ?'

    interface deleteHandlerInput{
        userId: string
    }

    const deleteHandler = ({userId}: deleteHandlerInput ) => {
        setUserId(userId)
        setDeletePopUp(!deletePopUp)
    }

    
    return <>
        (
            <div className="w-full h-screen mt-[6vh] bg-slate-50 z-500">  
                <ProfileNavbar/>
                <PostHeader text={location.state.user} user={true}/>
                <DisplayEntries deleteHandler={deleteHandler} userPost={true}  path={`/writings/user/${location.state.user}`}/>
                <Footer/>
            </div>

        )
        
        {deletePopUp && <DeletePopUp loading={setLoading} userId={userId} message={message} handler={deleteHandler}/>}
        {loading && <Loader/>}
        </>
          

}
