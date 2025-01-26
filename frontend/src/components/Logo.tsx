
import { Link } from "react-router-dom"
interface toInput {
    link: string
}
export default function Logo({link}:toInput){
    
    return (
        <div className="font-anton text-3xl font-extralight">
        <Link to={link}>
            Sensebound <span className="text-xs font-mono text-slate-500">beta.</span>
        </Link>
</div>
    )
}