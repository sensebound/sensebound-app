import PostHeader from "../components/PostHeader";
import ProfileNavbar from "../components/ProfileNavbar";
import Footer from "../components/Footer";
import DisplayStats from "../components/DisplayStats";

export default function Stats(){

    return <div className="w-full h-screen mt-[9vh]  bg-slate-50">
        <ProfileNavbar />
        <PostHeader text="Your Stats"/>
        <DisplayStats/>
        <Footer/>
    </div>
}