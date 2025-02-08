import StatBox from "./StatBox";
import { useEffect, useState } from "react";
import { Profile } from "../../types/profile";
import ProfileAvatar from "./ProfileAvatar";
import getProfile from "../services/getProfile";
import NotFound from "../../assets/lottie_animations/not_found.json";
import Lottie from "lottie-react";
import BioSection from "./BioSection";
import FollowButton from "./widgets/FollowButton";
import { useMyProfile } from "../contexts/myProfileContext";

interface ProfileProps {
    userId: string
}

const ProfileComponent: React.FC<ProfileProps> = ({ userId }) => {

    const [couldNotFindAuthor, setCouldNotFindAuthor] = useState<boolean>(false);
    const [profile, setProfile] = useState<Profile | null>(null);

    const currentUserProfile = useMyProfile();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileResponse = await getProfile(userId);

                if (profileResponse.error) {
                    throw new Error("Error fetching profile.");
                }

                setProfile(profileResponse.profile);
            } catch (error) {
                setCouldNotFindAuthor(true);
            }
        }

        fetchProfile();
    }, [profile])

    if (couldNotFindAuthor) return (
        <div className="flex justify-center items-center flex-grow h-screen text-3xl">
            <div className="flex-col text-center transform -translate-y-20">
                <Lottie className="h-48" animationData={NotFound} />
                <div>This author does not exist.</div>
            </div>
        </div>
    )

    return (
        <div className="px-12 py-2">
            <div className="bg-stone-50 p-16 rounded-lg min-h-[85vh]">
                <div className="flex items-center justify-center">
                    <div className="flex-col space-y-8 w-1/2">
                        <div className="flex items-center justify-center space-x-6">
                            <h1 className="text-4xl">{profile?.author.penName}</h1>
                            {
                                currentUserProfile.profile && (
                                    <div>
                                        <FollowButton targetId={userId}/>
                                    </div>
                                )
                            }
                        </div>

                        <div className="flex items-center justify-center">
                            <ProfileAvatar avatarUrl={profile?.author.avatarUrl} />
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <div className="flex space-x-6">
                                <StatBox title="Stories" count={profile?.stats.stories ?? 0} redirect={`/stories?id=${userId}`} />
                                <StatBox title="Followers" count={profile?.stats.followers ?? 0} redirect="/followers" />
                                <StatBox title="Following" count={profile?.stats.following ?? 0} redirect="/following" />
                            </div>
                        </div>

                    </div>
                    <div className="w-1/2 flex items-start justify-center">
                        <BioSection bio={profile?.author.bio} createdAt={profile?.author.created_at} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileComponent;