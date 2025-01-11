import { useEffect } from "react";
import useAuthStatus from "../helpers/useAuthStatus";
import { useNavigate } from "react-router-dom";

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

    // need a sign out button

    

    return (
        <div>
            <h1>Cole Whaley</h1>
        </div>
    )
}

export default ProfilePage;