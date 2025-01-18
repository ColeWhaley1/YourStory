import { Author } from "../../../types/story";
import supabase from "../../supabase";

interface AuthorResponse {
    author: Author | null,
    error: string | null
}

const getAuthorService = async (email: string): Promise<AuthorResponse> => {
    try {

        const { data, error } = await supabase.from("author").select("*").eq("email", email);

        if(error){
            throw new Error(error.message)
        }

        return {
            author: data[0],
            error: null
        }
        
    } catch (error: any) {
        return {
            author: null,
            error: error.message
        }
    }
}

export default getAuthorService;