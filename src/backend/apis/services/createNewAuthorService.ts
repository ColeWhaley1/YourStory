import supabase from "../../supabase";

interface CreateNewAuthorResponse {
    error: string | null
}

const createNewAuthorService = async (user_id: string, email: string, bio: string, pen_name: string): Promise<CreateNewAuthorResponse> => {
    try {
        
        const { error } = await supabase
                                .from("author")
                                .insert([{
                                    user_id,
                                    email,
                                    bio,
                                    pen_name
                                }])

        if(error){
            throw new Error(error.message);
        }

        return {
            error: null
        }
    } catch (error:any) {
        return {
            error: error.message
        }
    }
}

export default createNewAuthorService;