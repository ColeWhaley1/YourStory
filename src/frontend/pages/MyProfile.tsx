import { useEffect, useState } from "react";
import useAuthStatus from "../helpers/useAuthStatus";
import { useNavigate } from "react-router-dom";
import signOut from "../services/signOut";
import { Session } from "@supabase/supabase-js";
import getUserSession from "../services/getUserSession";
import authorExists from "../services/authorExists";
import { Author } from "../../types/story";
import { getAuthorByEmail } from "../services/getAuthor";
import StatBox from "../components/StatBox";
import { MdEdit } from "react-icons/md";
import DefaultAvatar from "../../assets/static_images/DefaultAvatar.png";

const MyProfilePage = () => {

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
    }, [isSignedIn]);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionResponse = await getUserSession();

            if (sessionResponse.error) {
                setError(sessionResponse.error);
                return;
            }

            if (sessionResponse.session) {
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

                if (authorExistsResponse.error) {
                    setError(authorExistsResponse.error);
                    return;
                }

                if (authorExistsResponse.authorExists) {
                    const authorResponse = await getAuthorByEmail(email);

                    if (authorResponse.error) {
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
    }, [session]);

    const handleSignOut = async () => {
        // setLoading(true);
        const response = await signOut();
        // setLoading(false);
    }

    if (!author) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className="px-12 py-2">
            <div className="bg-stone-50 p-16 rounded-lg min-h-[680px]">


                <div className="flex-col space-y-8">
                    <div className="flex items-center justify-center text-4xl space-x-4">
                        <h1>{author.pen_name}</h1>
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
            
            <button className="fixed bottom-6 right-6 rounded-full border-2 p-4 bg-white shadow-lg hover:shadow-2xl transition">
                <MdEdit className="w-8 h-8" />
            </button>
            <div className="flex items-center justify-center fixed bottom-6 left-6">
                <button onClick={handleSignOut} className="bg-secondary p-4 rounded-lg hover:shadow-2xl transition">Sign Out</button>
            </div>

        </div>
    )
}

export default MyProfilePage;