import { useEffect, useState } from "react";
import supabase from "../supabase";

const useAuthStatus = (): boolean | null => {

    const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

    useEffect(() => {

        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            setIsSignedIn(!!data.session);
        }

        checkSession();

        const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setIsSignedIn(!!session);
        });

        return () => {
            subscription?.subscription.unsubscribe();
        }
    }, []);

    return isSignedIn;
}

export default useAuthStatus;