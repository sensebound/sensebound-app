

import Footer from "../components/Footer";

import PlainHeader from "../components/PlainHeader";
import ObjectWritingGuide from "../components/ObjectWritingGuide";

export default function Guide(){

    return <div className="w-full h-screen    bg-slate-50">
        <PlainHeader/>
        <div className="font-bold text-lg pt-[5vh] px-[10vw] md:px-[25vw] lg:px-[30vw] mt-5 bg-slate-50">
         {'Object Writing: A Breif Guide'}
         <hr className="my-6 h-0.5 border-t-0 bg-neutral-200" />
        </div> 
        <ObjectWritingGuide/>
        <Footer/>
    </div>
}
