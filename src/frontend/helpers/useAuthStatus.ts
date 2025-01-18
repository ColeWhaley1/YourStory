import { useEffect, useState } from "react";
import supabase from "../supabase";
import authorExists from "../services/authorExists";
import createNewAuthor from "../services/createNewAuthor";

const useAuthStatus = (): boolean | null => {

    const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

    useEffect(() => {

        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            setIsSignedIn(!!data.session);
        }

        checkSession();

        const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {

            // check during sign in events if user has a matching author. If not, create one
            if(event == "SIGNED_IN"){

                const id = session?.user.id;
                const email = session?.user.email;

                if(id && email){
                    const authorExistsResponse = await authorExists(email);
                    if(!authorExistsResponse.authorExists){
                        createNewAuthor(id, email);
                    }
                } 

            }
            setIsSignedIn(!!session);
        });

        return () => {
            subscription?.subscription.unsubscribe();
        }
    }, []);

    return isSignedIn;
}

export default useAuthStatus;