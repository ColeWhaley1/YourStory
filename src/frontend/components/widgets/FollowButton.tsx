import { useEffect, useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import getSessionId from "../../services/getSessionId";
import getFollowStatus from "../../services/getFollowStatus";
import { FaTimes } from "react-icons/fa";

interface FollowButtonProps {
    targetId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ targetId }) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                const currentIdResponse = await getSessionId();

                if (currentIdResponse.error || !currentIdResponse.id) {
                    throw new Error("Could not fetch session id.");
                }

                setCurrentUserId(currentIdResponse.id);

                const followStatusResponse = await getFollowStatus(currentIdResponse.id, targetId);

                if (followStatusResponse.error) {
                    throw new Error("Could not fetch follow status.");
                }

                setIsFollowing(followStatusResponse.isFollowing);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchFollowStatus();
    }, []);

    const follow = () => {
        // Implement follow logic
    };

    const unfollow = () => {
        // Implement unfollow logic
    };

    return (
        <button
            title={isFollowing ? (isHovered ? "Unfollow" : "Following") : "Follow"}
            className={`cursor-pointer flex items-center ${
                isFollowing ? "bg-green-500" : "bg-primary"
            } hover:shadow-lg rounded-md duration-100 p-2 transform active:scale-110`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center justify-center space-x-2">
                <div className="w-full h-full flex items-center justify-center text-white">
                    {isFollowing ? (isHovered ? <FaTimes /> : <FaCheck />) : <IoPersonAdd />}
                </div>
                <span className="text-md text-white font-bold pr-1">
                    {isFollowing ? (isHovered ? "Unfollow" : "Following") : "Follow"}
                </span>
            </div>
        </button>
    );
};

export default FollowButton;
