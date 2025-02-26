import { useNavigate } from "react-router-dom"

interface EntryCardInputs {
    username: string,
    datePosted: string,
    text: string,
    wordOfTheDay: string,
    deleteHandler?: ({id}: {id:string}) => void,
    userPost?: boolean,
    postId?: string

}

export default function EntryCard({username, datePosted,postId, text, wordOfTheDay, deleteHandler,userPost}: EntryCardInputs)  {

    const navigate = useNavigate();
    const date =  new Date(datePosted);
    const dateString = date.toDateString().slice(4,15);

    return ( 
        <div className="min-h-[30vh]  mt-7 border-[1px] border-gray-600 flex flex-col p-7 rounded-lg shadow-xl ">
            <div className="mb-[2vh] mt-[1vh] flex justify-between">
                <button className="w-full" onClick={()=>{
                        navigate('/userProfile',{state:{user: username}})
                }}>
                <div className="flex items-center">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                        </svg>
                    </div>
                    <div className=" ml-2 text-xs ">
                        {username}
                    </div>
                </div>
                </button>
                
                <div className="text-sm lg:text-regular flex items-center">
                    <div className="h-4 w-4 mr-2 opacity-60">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                        <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="text-xs whitespace-nowrap">
                        {dateString}
                    </div>
                    
                </div>
            </div>

            <div className="flex flex-col text-sm font-light pb-4">
                <div className="font-bold mb-2 flex items-center">
                
                    <div className="italic">
                        {wordOfTheDay}
                    </div>
                    
                </div>
                <div className="mt-4 h-fit overflow-hidden text-ellipsis line-clamp-3">
                    {text.slice(0,200) + " ..."}
                </div>
                
            </div>

            

            <div className={`flex ${userPost ? `justify-between`: 'justify-end'} mt-auto`}>

                {userPost && <button onClick={() => deleteHandler && deleteHandler({id:String(postId)})}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="h-[2vh] w-[2vh]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>}
                
            
                <button className="border-[1px] bg-black text-sm md:text-md  text-black text-slate-50 border-black rounded-2xl px-4 py-1 flex" onClick={
                    () => {
                        navigate("/post", {state: {user: username, date: datePosted, text:text, word: wordOfTheDay}})
                    }
                } >
                    {"Read"}
                </button>
            </div>
        </div>
    )

}