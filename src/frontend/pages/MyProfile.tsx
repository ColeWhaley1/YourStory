import { useEffect, useState } from "react";
import useAuthStatus from "../helpers/useAuthStatus";
import { useNavigate } from "react-router-dom";
import signOut from "../services/signOut";
import { MdEdit } from "react-icons/md";
import Loading from "../components/Loading";
import CreateProfile from "../components/CreateProfile";
import ProfileAvatar from "../components/ProfileAvatar";
import ProfileStats from "../components/ProfileStats";
import { useMyProfile } from "../contexts/myProfileContext";

const MyProfilePage = () => {

    const isSignedIn = useAuthStatus();
    const navigate = useNavigate();
    const [showCreateProfile, setShowCreateProfile] = useState<boolean>(false);

    const { profile } = useMyProfile();

    useEffect(() => {
        console.log(profile);
        if (isSignedIn == false) {
            navigate("/sign_up");
            return;
        }
    }, [isSignedIn]);

    const handleSignOut = async () => {
        await signOut();
    }

    if (showCreateProfile) {
        return (
            <CreateProfile setShowCreateProfile={setShowCreateProfile}/>
        )
    }

    if (!profile) {
        return <Loading />
    }

    return (
        <div className="px-12 py-2">
            <div className="bg-stone-50 p-16 rounded-lg min-h-[85vh]">

                <div className="flex-col space-y-8">
                    <div className="flex items-center justify-center text-4xl space-x-4">
                        <h1>{profile.author.penName}</h1>
                    </div>

                    <div className="flex items-center justify-center">
                        <ProfileAvatar avatarUrl={profile.author.avatarUrl}/>
                    </div>

                    <ProfileStats storiesCount={profile.stats.stories} followersCount={profile.stats.followers} followingCount={profile.stats.following}/>

                </div>
            </div>

            <button className="fixed bottom-6 right-6 rounded-full border-2 p-4 bg-white shadow-lg hover:shadow-2xl transition">
                <MdEdit className="w-8 h-8" />
            </button>
            <div className="flex items-center justify-center fixed bottom-6 left-6">
                <button onClick={handleSignOut} className="bg-secondary p-4 rounded-lg hover:shadow-2xl transition">Sign Out</button>
            </div>

        </div>
    )
}

export default MyProfilePage;