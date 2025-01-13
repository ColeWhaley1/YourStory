import supabase from "../../supabase";

const authorExistsService = async (email: string) => {
    try {

        const { data, error } = await supabase.from("author").select("email").eq("email", email)

        if(error){
            throw new Error(error.message)
        }

        return {
            authorExists: data.length != 0,
            error: null
        }
        
    } catch (error: any) {
        return {
            authorExists: true,
            error: error.message
        }
    }
}

export default authorExistsService;