import { useEffect, useState } from "react";

import { BACKEND_URL } from "../config";
import axios from "axios";
import EntryCard from "./EntryCard";
import SkeletonList from "../components/SkeletonList"

interface displayEntriesInput {
    path: string
    community: boolean
}

export default function DisplayEntries({path}: displayEntriesInput){
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   
  

   useEffect(()=>{
    setLoading(true)
     axios.get(`${BACKEND_URL}/api/v1` + path ,{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }
        
     }

    )
    .then(
        (response) => {



        
        let finalPosts = response.data.posts;

        // if(community){
        //   finalPosts = shuffleArray(finalPosts);
        // }
        
        
        setData(finalPosts)
        setLoading(false)
    
    }).catch((error)=>{
        console.log(error)
    
    })
    
   },[path]);


  
        return (
            <div className="px-[10vw] md:px-[25vw] lg:px-[30vw] mt-5 pb-[10vh] bg-slate-50">
              {
                !loading ? (
                              data.map((item, key) => {
                              const username = item["user"]["username"];
                              const date = item["date_posted"];
                              const word = item["word"]["word"];
                              const text = item["content"];
                      
                              return (
                                <EntryCard
                                  key={key}
                                  username={username}
                                  datePosted={date}
                                  wordOfTheDay={word}
                                  text={text}
                                />
                              );
                              
                            }
                            
                              
                            
                )
              
              ) : (
                    <div className="text-center mt-10">
                        <SkeletonList/>
                    </div>
                )

                
              }

            {
              (data.length === 0 && !loading) && <div className="flex justify-center text-2xl font-semibold text-gray-400">
                  No posts available
              </div>
            }

            </div>
          )
        

        }