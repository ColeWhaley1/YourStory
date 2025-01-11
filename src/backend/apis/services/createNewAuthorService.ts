import supabase from "../../supabase";

interface CreateNewAuthorResponse {
    error: string | null
}

const createNewAuthorService = async (id: string, pen_name: string = "Anonymous"): Promise<CreateNewAuthorResponse> => {
    try {

        console.log(id, pen_name)
        
        const { error } = await supabase
                                .from("author")
                                .insert([{
                                    id,
                                    pen_name
                                }])

        if(error){
            throw new Error(error.message)
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