import { useEffect, useState } from "react";
import useAuthStatus from "../helpers/useAuthStatus";
import { useNavigate } from "react-router-dom";
import signOut from "../services/signOut";
import getUserSession from "../services/getUserSession";
import { Session } from "@supabase/supabase-js";

const ProfilePage = () => {

    const isSignedIn = useAuthStatus();
    const navigate = useNavigate();
    const [userSession, setUserSession] = useState<Session | null>(null);
    const [showProfile, setShowProfile] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchSession = async () => {
            const response = await getUserSession();

            if(response.error){
                setError(response.error);
                return;
            }

            setUserSession(response.session);
        }

        fetchSession();

    }, []);

    useEffect(() => {
       
    }, [userSession])

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

    if (!showProfile){
        return (
            <div>
                Loading...
            </div>
        )
    }

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