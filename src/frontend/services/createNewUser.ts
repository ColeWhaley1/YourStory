import { Author } from "../../types/story";
import supabase from "../supabase";
import authorExists from "./authorExists";

interface CreateNewUserResponse {
    id: string | null;
    error: string | null;
}

const createNewUser = async (sign_up_info: Author): Promise<CreateNewUserResponse> => {
    try {

        let id = null;    

        const authorExistsResponse = await authorExists(sign_up_info.email);

        if (authorExistsResponse.error){
            throw new Error(authorExistsResponse.error);
        }

        if (authorExistsResponse.authorExists){
            throw new Error("Author already exists.")
        }

        if (!authorExistsResponse.authorExists) {
            
            const { data, error } = await supabase.auth.signUp({
                email: sign_up_info.email, 
                password: sign_up_info.password
            });
    
            if (error) {
                throw new Error(error.message);
            }
    
            id = data.user?.id;
    
            if (!id) {
                throw new Error("Failed to create new user");
            }
        }
        
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