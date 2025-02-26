import PostHeader from "../components/PostHeader";
import ProfileNavbar from "../components/ProfileNavbar";
import Footer from "../components/Footer";
import DisplayStats from "../components/DisplayStats";
import DeletePopUp from "../components/DeletePopUp";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Stats(){
    const [deleteAccountPopUp, setDeleteAccountPopUp] = useState(false);
            const [userId, setUserId] = useState("");
            const [loading, setLoading] = useState(false);
            
            const navigate = useNavigate();
            
            useEffect(()=>{
                if(!localStorage.getItem("loggedIn")){ navigate("/")};
            },[]);


            interface deleteHandlerInput{
                id: string
            }
        
            const deleteAccountHandler = ({id}:deleteHandlerInput) => {
                setUserId(id);
                setDeleteAccountPopUp(!deleteAccountPopUp)
            }
        

    return <div className="relative w-full overflow-hidden">
            <div className="w-full h-screen mt-[9vh]  bg-slate-50">
            <ProfileNavbar stats={true} handler={deleteAccountHandler}/>
            <PostHeader text="Your Stats"/>
            <DisplayStats/>
            <Footer/>
            {deleteAccountPopUp && <DeletePopUp deletePost={false} loading={setLoading} userId={userId} handler={deleteAccountHandler}/>}
            {loading && <Loader/>}
            </div>
          </div>
}