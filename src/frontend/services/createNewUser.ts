import { Author } from "../../types/story";
import supabase from "../supabase";

const createNewUser = async (sign_up_info: Author): Promise<string | undefined | null> => {
    try {
        
        const { data, error } = await supabase.auth.signUp({
            email: sign_up_info.email,
            password: sign_up_info.password
        });

        if (error) {
            throw new Error(error.message);
        }

        const id = data.user?.id;

        // create new author with this id?
        
        console.log(id);
        return id;
    } catch (error: any) {
        console.error(error.message);
        return null;
    }
}

export default createNewUser;