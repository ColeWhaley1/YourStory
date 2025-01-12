import { SignIn } from "../../types/story";
import supabase from "../supabase";

interface SignInResponse {
    id: string | null;
    error: string | null;
}

const signInUser = async (sign_in_info: SignIn, allowAccess: () => void): Promise<SignInResponse> => {
    try {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: sign_in_info.email, 
            password: sign_in_info.password
        });

        if (error){
            throw new Error(error.message);
        }

        allowAccess();

        return {
            id: data.user.id,
            error: null
        }

    } catch (error: any) {
        return {
            id: null,
            error: error.message
        };
    }
}

export default signInUser;