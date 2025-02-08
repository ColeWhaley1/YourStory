import { useEffect, useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import getSessionId from "../../services/getSessionId";
import getFollowStatus from "../../services/getFollowStatus";
import { FaTimes } from "react-icons/fa";
import followAuthor from "../../services/followAuthor";
import unfollowAuthor from "../../services/unfollowAuthor";

interface FollowButtonProps {
    targetId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ targetId }) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [justFollowed, setJustFollowed] = useState<boolean>(false);

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

    const handleClick = () => {
        if (isFollowing) {
            unfollow();
        } else {
            follow();
        }
    };

    const follow = async () => {
        setIsFollowing(true);
        setJustFollowed(true);

        try {
            if (!currentUserId || !targetId) {
                throw new Error("Failed to follow!");
            }
            const response = await followAuthor(currentUserId, targetId);
            if (response.error) {
                throw new Error("Failed to follow!");
            }
        } catch (error) {
            setIsFollowing(false);
        }
    };

    const unfollow = async () => {
        setIsFollowing(false);

        try {
            if (!currentUserId || !targetId) {
                throw new Error("Failed to unfollow!");
            }
            const response = await unfollowAuthor(currentUserId, targetId);
            if (response.error) {
                throw new Error("Failed to unfollow!");
            }
        } catch (error) {
            setIsFollowing(true);
        }
    };

    return (
        <button
            title={isFollowing ? (isHovered && !justFollowed ? "Unfollow" : "Following") : "Follow"}
            className={`cursor-pointer flex items-center ${
                isFollowing
                    ? isHovered && !justFollowed
                        ? "bg-red-400 outline outline-2 outline-red-500"
                        : "bg-green-500"
                    : "bg-primary"
            } hover:shadow-lg rounded-md duration-100 p-2 transform active:scale-110 min-w-28 flex items-center justify-center`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setJustFollowed(false);
            }}
            onClick={handleClick}
        >
            <div className="flex items-center justify-center space-x-2">
                <div className="w-full h-full flex items-center justify-center text-white">
                    {isFollowing ? (isHovered && !justFollowed ? <FaTimes /> : <FaCheck />) : <IoPersonAdd />}
                </div>
                <span className="text-md text-white font-bold pr-1">
                    {isFollowing ? (isHovered && !justFollowed ? "Unfollow" : "Following") : "Follow"}
                </span>
            </div>
        </button>
    );
};

export default FollowButton;
