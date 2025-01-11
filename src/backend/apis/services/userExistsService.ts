import supabase from "../../supabase";

const userExistsService = async (email: string) => {
    try {

        const { data, error } = await supabase.from("author").select("email").eq("email", email)

        if(error){
            throw new Error(error.message)
        }

        return {
            userExists: data.length != 0,
            error: null
        }
        
    } catch (error: any) {
        return {
            userExists: true,
            error: error.message
        }
    }
}

export default userExistsService;