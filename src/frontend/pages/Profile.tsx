import { useEffect, useState } from "react";
import useAuthStatus from "../helpers/useAuthStatus";
import { useNavigate } from "react-router-dom";
import signOut from "../services/signOut";
import { Session } from "@supabase/supabase-js";
import getUserSession from "../services/getUserSession";
import authorExists from "../services/authorExists";
import { Author } from "../../types/story";
import getAuthor from "../services/getAuthor";

const ProfilePage = () => {

    const isSignedIn = useAuthStatus();
    const navigate = useNavigate();
    const [session, setSession] = useState<Session | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [author, setAuthor] = useState<Author | null>(null);

    useEffect(() => {
        if (isSignedIn == false) {
            navigate("/sign_up");
            return;
        }
    }, []);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionResponse = await getUserSession();

            if(sessionResponse.error){
                setError(sessionResponse.error);
                return;
            }

            if(sessionResponse.session){
                setSession(sessionResponse.session);
            }
        }

        fetchSession();
    }, []);

    useEffect(() => {
        const fetchAuthor = async () => {
            const email = session?.user.email;
    
            if (email) {
                const authorExistsResponse = await authorExists(email);

                if(authorExistsResponse.error){
                    setError(authorExistsResponse.error);
                    return;
                }

                console.log(authorExistsResponse)

                if(authorExistsResponse.authorExists){
                    const authorResponse = await getAuthor(email);
                    console.log(authorResponse)

                    if(authorResponse.error){
                        setError(authorResponse.error);
                        return;
                    }

                    setAuthor(authorResponse.author);
                } else {
                    // else provide screen for creating profile
                }
            } 
        }

        fetchAuthor();
    },[session]);

    const handleSignOut = async () => {
        // setLoading(true);
        const response = await signOut();
        // setLoading(false);
    }

    if (!author){
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            <div>
                <h1>{ author.pen_name }</h1>
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