import { useEffect } from "react";
import useAuthStatus from "../helpers/useAuthStatus";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {

    const isSignedIn = useAuthStatus();

    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn == null || isSignedIn == false) {
            navigate("/log_in");
        }
    })

    return (
        <div>
            <h1>Cole Whaley</h1>
        </div>
    )
}

export default ProfilePage;