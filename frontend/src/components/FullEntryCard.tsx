import { useNavigate } from "react-router-dom"

interface EntryCardInputs {
    username: string,
    datePosted: string,
    text: string,
    wordOfTheDay: string,

}

export default function FullEntryCard({username, datePosted, text, wordOfTheDay}: EntryCardInputs){

    const navigate = useNavigate();
    const date =  new Date(datePosted)
    const dateString = date.toDateString().slice(4,15)

    return (
        <div className="min-w-[40vh] min-h-[40vh] mt-7 mb-7 border-[1px] border-gray-600 flex flex-col p-9 rounded-lg shadow-xl text-justify">
        <div className="mb-[2vh] mt-[2vh] flex justify-between ">
            <button className="w-full" onClick={()=>{
                    navigate('/userProfile',{state:{user: username}})
            }}>
            <div className="flex items-center">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                    </svg>
                </div>
                <div className="ml-2 text-xs ">
                    {username}
                </div>
            </div>
            </button>
            
            <div className="text-sm lg:text-regular flex items-center">
                <div className="h-5 w-5 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                    <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="text-xs whitespace-nowrap">
                    {dateString}
                </div>
                
            </div>
        </div>

        <div className="flex flex-col text-sm font-light">
            <div className="font-bold mb-2 flex items-center">
            
                <div>
                    {wordOfTheDay}
                </div>
                
            </div>
            <div className="font-normal mb-7">
                {text}
            </div>
            
        </div>

        

    </div>
    )
}