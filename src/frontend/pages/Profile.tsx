import { useEffect } from "react";
import useAuthStatus from "../helpers/useAuthStatus";
import { useNavigate } from "react-router-dom";
import signOut from "../services/signOut";

const ProfilePage = () => {

    const isSignedIn = useAuthStatus();

    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn == false) {
            navigate("/sign_up");
        }

        // check if user has confirmed their email. If they have, call createNewAuthorService
        // once created, return the new Author object so that it can be displayed
        // when first viewing profile, give helpful hints
        
        // if not confirmed, direct them to confirm their email
    })

    const handleSignOut = async () => {
        // setLoading(true);
        const response = await signOut();
        console.log(response);
        // setLoading(false);
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