import { useEffect } from "react";
import supabase from "../../supabase";

interface SignOutUserResponse {
    success: boolean;
    error: string | null;
}

const signOutUserService = async (): Promise<SignOutUserResponse> => {
    try {

        const { error } = await supabase.auth.signOut();


        if (error) {
            throw new Error(error.message);
        }

        return {
            success: true,
            error: null
        };
        
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        };
    }
}

export default signOutUserService;