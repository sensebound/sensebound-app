import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import Loader from "../components/Loader";
import UpdatePassword from "../components/UpdatePassword";

export default function Reset(){
    
    const searchParams = useSearchParams()[0];
    const [verified, setVerified] = useState<boolean>(false);
    
    
    const userId = searchParams.get('userid')
    const token = searchParams.get('token')
    
    
    useEffect(()=>{
        const url = BACKEND_URL + `/api/v1/user/password-reset/${userId}/${token}`
        axios.post(url, ).then((response)=>{
            if(response){
                setVerified(true)
            }
        })

    },[]);

    return (
        <div>
            {verified ? (
                <UpdatePassword userid={String(userId)}/>
            ) : <Loader/>}
            
        </div>
    )
}