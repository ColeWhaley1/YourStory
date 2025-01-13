import supabase from "../../supabase";

interface SignInUserResponse {
    id: string | null;
    error: string | null;
}

const signInUserService = async (email: string, password: string): Promise<SignInUserResponse> => {
    try {

        const { data, error } = await supabase.auth.signInWithPassword({
            email, password
        });

        if (error) {
            throw new Error(error.message);
        }

        const id = data?.user?.id;

        if (!id) {
            throw new Error("Failed to sign in user");
        }

        return {
            id: id,
            error: null
        };
        
    } catch (error: any) {
        return {
            id: null,
            error: error.message
        };
    }
}

export default signInUserService;