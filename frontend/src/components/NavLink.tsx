import { Link } from "react-router-dom";

interface NavlinkInputs{
    label : string,
}

export default function NavLink({label}: NavlinkInputs){

    return <>
             <Link to={''}>
                <p className="text-sm font-sans font-roboto ">{label}</p>
             </Link>
           </>

}