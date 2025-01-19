import StatBox from "./StatBox";
import DefaultAvatar from "../../assets/static_images/DefaultAvatar.png";
import { useState } from "react";
import { Profile } from "../../types/profile";

interface ProfileProps {
    user_id: string
}

const ProfileComponent: React.FC<ProfileProps> = ({ user_id }) => {

    const [profile, setProfile] = useState<Profile | null>(null);

    return (
        <div className="bg-stone-50 p-16 rounded-lg min-h-[680px]">
            <div className="flex-col space-y-8">
                <div className="flex items-center justify-center text-4xl space-x-4">
                    <h1>{ user_id }</h1>
                </div>

                <div className="flex items-center justify-center">
                    <img src={DefaultAvatar} className="w-1/6"></img>
                </div>

                <div className="w-full flex items-center justify-center">
                    <div className="flex space-x-12">
                        <StatBox title="Stories" count={7} redirect="/my_stories" />
                        <StatBox title="Followers" count={435} redirect="/followers" />
                        <StatBox title="Following" count={243} redirect="/following" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProfileComponent;