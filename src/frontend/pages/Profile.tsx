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
    })

    // when user signs up, they must confirm their email. A default Author row is created for them with Anonymous pen_name and auto-generated id
    // redirect link will take them to profile page with Anonymous pen_name, they can choose to change it with pencil beside name. 
    // when redirected, there should be a hint box to show user how to change name and other info

    return (
        <div>
            <h1>Cole Whaley</h1>
        </div>
    )
}

export default ProfilePage;