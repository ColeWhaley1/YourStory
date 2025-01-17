import { Session } from "@supabase/supabase-js";
import supabase from "../supabase";

export interface UserSessionResponse {
    session: Session | null,
    error: string | null
}

const getUserSession = async (): Promise<UserSessionResponse> => {
    try {

        const { data, error } = await supabase.auth.getSession();

        if (error){
            throw new Error("Could not retrieve user session.");
        }

        return {
            session: data.session,
            error: null
        }
        
    } catch (error: any) {
        return {
            session: null,
            error: error.message
        }
    }
}

export default getUserSession;