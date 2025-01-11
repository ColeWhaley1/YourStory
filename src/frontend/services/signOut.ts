import supabase from "../supabase";

interface SignOutResponse {
    success: boolean,
    error: string | null
}


const signOut = async (): Promise<SignOutResponse> => {
    
}

export default signOut;