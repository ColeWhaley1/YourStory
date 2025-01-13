import { Author } from "../../types/story";
import supabase from "../supabase";

interface CreateNewUserResponse {
    id: string | null;
    error: string | null;
}

const createNewUser = async (sign_up_info: Author): Promise<CreateNewUserResponse> => {
    try {

        let id = null;

        const base_url = import.meta.env.VITE_API_BASE_URL
        
        const userExistsResponse = await fetch(`${base_url}/auth/user_exists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: sign_up_info.email })
        });

        if (!userExistsResponse.ok){
            throw new Error("Failed to create new user.")
        }

        const userExistsData = await userExistsResponse.json();

        if (userExistsData.error){
            throw new Error(userExistsData.error.message);
        }

        if (userExistsData.userExists){
            throw new Error("User already exists.")
        }

        if (!userExistsData.userExists) {
            
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
    
            // const newAuthorResponse = await createNewAuthorService(id, email);
    
            // if (newAuthorResponse.error) {
            //     throw new Error("Failed to create new author")
            // }
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