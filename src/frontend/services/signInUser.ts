import { SignIn } from "../../types/story";
import supabase from "../supabase";

const signInUser = async (sign_in_info: SignIn): Promise<string | undefined | null> => {
    try {
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email: sign_in_info.email,
            password: sign_in_info.password
        });

        if (error) {
            throw new Error(error.message);
        }

        const id = data.user?.id;
        console.log(id);
        return id;
    } catch (error: any) {
        console.error(error.message);
        return null;
    }
}

export default signInUser;