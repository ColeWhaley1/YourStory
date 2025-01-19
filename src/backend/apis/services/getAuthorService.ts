import { Author } from "../../../types/story";
import supabase from "../../supabase";

interface AuthorResponse {
    author: Author | null,
    error: string | null
}

const getAuthorService = async (user_id?: string, email?: string): Promise<AuthorResponse> => {
    try {

        if (!email && !user_id) {
            throw new Error("Email and user id missing.")
        }

        if(user_id){
            const { data, error } = await supabase.from("author").select("*").eq("user_id", user_id);
            
            if(error){
                throw new Error(error.message)
            }
    
            return {
                author: data[0],
                error: null
            }
        } else {
            const { data, error } = await supabase.from("author").select("*").eq("email", email);
    
            if(error){
                throw new Error(error.message)
            }
    
            return {
                author: data[0],
                error: null
            }
        }
        
    } catch (error: any) {
        return {
            author: null,
            error: error.message
        }
    }
}

export default getAuthorService;