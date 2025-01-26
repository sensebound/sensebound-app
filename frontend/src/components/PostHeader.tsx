import { UserIcon } from "./UserIcon"

interface headerInput {
    text: string | null
    user?: boolean
}


export default function PostHeader({text,user}: headerInput){


    return (
        <div className="font-bold font-sans text-xl pt-[5vh] px-[10vw] md:px-[25vw] lg:px-[30vw] mt-5 bg-slate-50">
         <div className="flex justify-start items-center">
            {user && <UserIcon/>}

            <span className="ml-1">
                {text}
            </span>
            
         </div>

         <hr className="my-12 h-0.5 border-t-0 bg-neutral-200" />
        </div>


    )
}