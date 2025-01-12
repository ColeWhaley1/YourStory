import supabase from "../supabase";

interface SignOutResponse {
    success: boolean,
    error: string | null
}

const signOut = async (revokeAccess: () => void): Promise<SignOutResponse> => {
    
    try {
        
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw new Error(error.message);
        }

        // set accessRevoked flag to true in local storage
        revokeAccess();

        return {
            success: true,
            error: null
        }

    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}

export default signOut;