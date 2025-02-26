import Footer from "../components/Footer";

import LandingQuote from "../components/LandingQuote";
import Navbar from "../components/Navbar";
import clock from "../assets/clock.svg"
import { useState, useEffect } from "react";
import SignUpCard from "../components/SignUpCard";
import SignInCard from "../components/SigninCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import WordCard from "../components/WordCard";
import { BACKEND_URL } from "../config";
import axios from "axios";




export default function LandingPage(){

    const [displaySignUp, setDisplaySignUp] = useState<boolean>(false);
    const [displaySignIn, setDisplaySignIn] = useState<boolean>(false);
    const [displayWord, setdisplayWord] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate();


    useEffect( ()=>{
        setLoading(true)
        setTimeout(()=>{setLoading(false)},1500)

        axios.get(`${BACKEND_URL}/api/v1/words/todayWord`)
        .then(response => {
            const word = response.data
            localStorage.setItem("wordOfTheDay", word.todaysWord.word)
            localStorage.setItem("wordId", word.todaysWord.id)
        })
        
},[])


        useEffect(()=>{
            if(localStorage.getItem('loggedIn')){
                navigate('/profile')
            }else{
                localStorage.clear();
            }
        }
        ,[navigate])    

    

    function handleSignUpPopUp(){
        setDisplaySignUp(true)
    }

    function handleSignInPopUp(){
        setDisplaySignIn(true)
    }

    function Close(){
        setDisplaySignIn(false);
        setDisplaySignUp(false);
    }

    function Swap(){
        setDisplaySignIn(!displaySignIn);
        setDisplaySignUp(!displaySignUp);
    }

    function WordHandler(){
        setdisplayWord(!displayWord)
    }

    const isLoggedIn = localStorage.getItem("loggedIn")

    if(isLoggedIn){
        navigate('/profile')
    }


  
    
    
    return  <>  {
            loading ? (<Loader/>) 
            
                    : (<div  className={`h-screen w-screen-full relative bg-slate-50`}>
                        <Navbar handleSignInPop={handleSignInPopUp} handleSignUpPop={handleSignUpPopUp} handleWordOfTheDay={WordHandler}/>
                        <div className="grid ml-[4vw] md:ml-0">
                            <div className="col-span-1">
                                <LandingQuote handleWord={WordHandler} handleSignInPopUp={handleSignInPopUp}/>
                            </div>
                            <div className="fixed hidden lg:flex left-[65vw] opacity-5 top-[10vh] right-[-50vw]">
                                <img src={clock}  />
                            </div>
                        </div>

                        <Footer/>   
                        {displaySignUp && <SignUpCard  close={Close} swap={Swap} setLoading={setLoading}/>} 
                        {displaySignIn && <SignInCard  close={Close} swap={Swap} setLoading={setLoading}/>}
                        {displayWord && <WordCard handler={WordHandler}/>}

                    </div>)
            }

          


           

            

          
        </>
}