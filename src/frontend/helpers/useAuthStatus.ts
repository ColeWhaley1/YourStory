import { useEffect, useState } from "react";
import supabase from "../supabase";
import useAccessControl from "./useAccessControl";

const useAuthStatus = (): boolean | null => {

    const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

    const { accessRevoked } = useAccessControl();

    useEffect(() => {

        if (accessRevoked){
            setIsSignedIn(false);
            return;
        }

        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            setIsSignedIn(!!data.session);
        }

        checkSession();

        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsSignedIn(!!session);
        });

        return () => {
            subscription?.subscription.unsubscribe();
        }
    }, [accessRevoked]);

    return isSignedIn && !accessRevoked;
}

export default useAuthStatus;