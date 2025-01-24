import { useSearchParams } from "react-router-dom";
import ProfileComponent from "../components/Profile";
import NotFound from "../../assets/lottie_animations/not_found.json";
import Lottie from "lottie-react";


const ProfilePage = () => {

    const [searchParams] = useSearchParams();

    const user_id = searchParams.get("user_id");

    if(!user_id){
        return (
            <div className="flex justify-center items-center flex-grow h-screen text-3xl">
                <div className="flex-col text-center transform -translate-y-20">
                    <Lottie className="h-48" animationData={NotFound} />
                    <div>This user does not exist.</div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <ProfileComponent user_id={user_id}/>
        </div>
    )
}

export default ProfilePage;