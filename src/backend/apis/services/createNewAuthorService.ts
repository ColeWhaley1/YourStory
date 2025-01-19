import supabase from "../../supabase";

interface CreateNewAuthorResponse {
    error: string | null
}

const createNewAuthorService = async (user_id: string, email: string, pen_name: string = "Anonymous"): Promise<CreateNewAuthorResponse> => {
    try {
        
        const { error } = await supabase
                                .from("author")
                                .insert([{
                                    user_id,
                                    email,
                                    pen_name
                                }])

        if(error){
            throw new Error(error.message);
        }

        return {
            error: null
        }
    } catch (error:any) {
        console.log(error);
        return {
            error: error.message
        }
    }
}

export default createNewAuthorService;