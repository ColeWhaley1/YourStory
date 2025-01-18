import { useEffect, useState } from "react";
import useAuthStatus from "../helpers/useAuthStatus";
import { useNavigate } from "react-router-dom";
import signOut from "../services/signOut";

const ProfilePage = () => {

    const isSignedIn = useAuthStatus();
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isSignedIn == false) {
            navigate("/sign_up");
            return;
        }
    })

    const handleSignOut = async () => {
        // setLoading(true);
        const response = await signOut();
        // setLoading(false);
    }

    // if (!showProfile){
    //     return (
    //         <div>
    //             Loading...
    //         </div>
    //     )
    // }

    return (
        <div>
            <div>
                <h1>Cole Whaley</h1>
            </div>

            <div className="flex items-center justify-center">
                <div className="bg-secondary p-4 rounded-lg">
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;