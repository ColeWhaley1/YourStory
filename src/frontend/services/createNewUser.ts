import { Author } from "../../types/story";
import supabase from "../supabase";

interface CreateNewUserResponse {
    id: string | null;
    error: string | null;
}

const createNewUser = async (sign_up_info: Author): Promise<CreateNewUserResponse> => {
    try {

        let id = null;

        const base_url = import.meta.env.VITE_API_BASE_URL;
        
        const authorExistsResponse = await fetch(`${base_url}/auth/user_exists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: sign_up_info.email })
        });

        if (!authorExistsResponse.ok){
            throw new Error("Failed to create new author.")
        }

        const authorExistsData = await authorExistsResponse.json();

        if (authorExistsData.error){
            throw new Error(authorExistsData.error.message);
        }

        if (authorExistsData.authorExists){
            throw new Error("Author already exists.")
        }

        if (!authorExistsData.authorExists) {
            
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