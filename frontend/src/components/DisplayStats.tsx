
import StatComponent from "./StatComponent";
import { ContributionCalendar } from 'react-contribution-calendar'
import {useEffect, useState} from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";


export default function DisplayStats(){

    const [cellSize, setCellSize] = useState(0)
    const [totalEntries, setTotalEntries] = useState("")
    const [timeSpent, setTimeSpent] = useState<string>("")
    const [avgWordCount, setAvgWordCount] = useState<string>("")
    const [dateList, setDateList] = useState<Array<trackerObject>>([])
    

    const username = localStorage.getItem("user");


    interface trackerObject {
        [key: string]: {level: number}
    }



    useEffect(()=>{

        axios.get(`${BACKEND_URL}/api/v1/writings/user/${username}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(((response) => {
            
            // total Entries
            setTotalEntries(response.data.posts.length)


            // Time spent writing 
            const time = ((response.data.posts.length*10)/60).toFixed(2);
            setTimeSpent(time)
            

            // avg word count
        
            let wordCounts : Array<number> = []

            for(let i=0; i < response.data.posts.length; i++){
                let content = response.data.posts[i].content        
                let wordArray = content.split(" ")
                wordCounts.push(wordArray.length)

            } 

            let sum = wordCounts.reduce((accumulator, currentValue) => accumulator + currentValue)
            let avg = sum/wordCounts.length
            const avgWordCount = avg.toFixed(2)
            setAvgWordCount(avgWordCount)

            // date list 
            
            let dateArray : Array<trackerObject> = [];

            for(let i=0; i< response.data.posts.length; i++){
                
                 const date = response.data.posts[i].date_posted;
                 const formattedDate = date.slice(0,10);
                 let trackerObject : trackerObject = {};
                 trackerObject[formattedDate] = {level: 3};
                 
                 dateArray.push(trackerObject);
                 
            }

            setDateList(dateArray)
                                                                                                                                                                                           
            
        } ))
        

    },[])


    

    useEffect(()=>{
            const updateCellSize = () => {
                setCellSize(6)
                if (window.matchMedia("(min-width:640px)").matches){
                    setCellSize(8)
                }
                if(window.matchMedia("(min-width:768px)").matches){
                    setCellSize(9)
                }
                if(window.matchMedia("(min-width:1024px)").matches){
                    setCellSize(14)
                }

            }
            updateCellSize();   
            window.addEventListener("resize", updateCellSize)

            return () => window.removeEventListener("resize", updateCellSize)
    },[]);

   

    return (
        <div className="px-[2vw] md:px-[25vw] lg:px-[30vw] mt-7  bg-slate-50">
            
            <div className="flex justify-center ml-14">
                <ContributionCalendar
                data={dateList}
                theme={'grass'} 
                scroll={false} 
                includeBoundary={true}
                hideDescription={true}
                daysOfTheWeek={['','','','','','','']}
                cx={cellSize}
                cy={cellSize}
                cr={5}/>
            </div>

            <div>
                <StatComponent stat="Total Entries" value={totalEntries}/>
                <StatComponent stat="Time Spent Writing (hrs)" value={timeSpent}/>
                <StatComponent stat="Avg. Word Count  " value={avgWordCount}/>
            </div>

            
            
        </div>
    )
}