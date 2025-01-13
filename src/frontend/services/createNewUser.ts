import { Author } from "../../types/story";
import supabase from "../supabase";

interface CreateNewUserResponse {
    id: string | null;
    error: string | null;
}

const createNewUser = async (sign_up_info: Author): Promise<CreateNewUserResponse> => {
    try {

        // const userExistsResponse = await userExistsService(email);

        // if (userExistsResponse.error) {
        //     throw new Error(userExistsResponse.error.message)
        // }

        // if (!userExistsResponse.userExists) {
        // }

        const { data, error } = await supabase.auth.signUp({
            email: sign_up_info.email, 
            password: sign_up_info.password
        });

        if (error) {
            throw new Error(error.message);
        }

        const id = data.user?.id;

        if (!id) {
            throw new Error("Failed to create new user");
        }

        // const newAuthorResponse = await createNewAuthorService(id, email);

        // if (newAuthorResponse.error) {
        //     throw new Error("Failed to create new author")
        // }
        
        return {
            id,
            error: null,
        };
    } catch (error: any) {
        return {
            id: null,
            error: error.message,
        };
    }
}

export default createNewUser;