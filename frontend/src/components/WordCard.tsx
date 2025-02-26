import { MouseEventHandler} from "react"



interface WordCardInputs {   
    handler: MouseEventHandler<HTMLButtonElement>    
}


export default function WordCard({handler}: WordCardInputs){
    

    const word = localStorage.getItem("wordOfTheDay")
    

    return (
        <div  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                        <div className="bg-slate-50 p-6 rounded-lg shadow-xl">
                            <div className="flex flex-col justify-end w-60 sm:w-75 md:w-80">
                                        <div className="flex flex-row justify-end w-60 sm:w-75 md:w-80">
                                                    <button onClick={handler}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                        </div>

                                    <div className="h-40 flex flex-col justify-center items-center">
                                                <p className="text-xl md:text-4xl font-anton font-light  mt-3 flex justify-center text-center">
                                                    {word}
                                                </p>
                                                
                                                <p className="text-xs pt-[5vh] italic">source: <span className="font-normal">objectwriting.com</span></p>         
                                    </div>
                            </div>
                        </div>

        </div>
    )

}


