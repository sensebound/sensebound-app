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
    const [deletePostPopUp, setDeletePostPopUp] = useState(false);
    const [deleteAccountPopUp, setDeleteAccountPopUp] = useState(false);
    const [postId, setPostId] = useState("");
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false)

 

    interface deleteHandlerInput{
        id: string
    }

    const deletePostHandler = ({id}: deleteHandlerInput ) => {
        setPostId(id)
        setDeletePostPopUp(!deletePostPopUp)
    }

    const deleteAccountHandler = ({id}:deleteHandlerInput) => {
        setUserId(id);
        setDeleteAccountPopUp(!deleteAccountPopUp)
    }

    
    return <>
        (
            <div className="w-full h-screen mt-[6vh] bg-slate-50 z-500">  
                <ProfileNavbar handler={deleteAccountHandler}/>
                <PostHeader text={location.state.user} user={true}/>
                <DisplayEntries deleteHandler={deletePostHandler} userPost={true}  path={`/writings/user/${location.state.user}`}/>
                <Footer/>
            </div>

        )
        
        {deletePostPopUp && <DeletePopUp deletePost={true} loading={setLoading} postId={postId} handler={deletePostHandler}/>}
        {deleteAccountPopUp && <DeletePopUp deletePost={false} loading={setLoading} userId={userId} handler={deleteAccountHandler}/>}
        {loading && <Loader/>}
        </>
          

}
