import supabase from "../../supabase";

interface CreateNewUserServiceResponse {
    id: string | null;
    error: string | null;
}

const createNewUserService = async (email: string, password: string): Promise<CreateNewUserServiceResponse> => {
    try {

        const { data, error } = await supabase.auth.signUp({
            email, password
        });

        console.log("supabase error", error);

        if (error) {
            throw new Error(error.message);
        }

        const id = data.user?.id;

        // create new author with this id?

        if (!id) {
            throw new Error("Failed to create new user");
        }

        return {
            id: id,
            error: null
        };
        
    } catch (error: any) {
        console.error(error.message);
        return {
            id: null,
            error: error.message
        };
    }
}

export default createNewUserService;