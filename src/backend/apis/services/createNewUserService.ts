import supabase from "../../supabase";
import createNewAuthorService from "./createNewAuthorService";

interface CreateNewUserServiceResponse {
    id: string | null;
    error: string | null;
}

const createNewUserService = async (email: string, password: string): Promise<CreateNewUserServiceResponse> => {
    try {

        const { data, error } = await supabase.auth.signUp({
            email, password
        });

        if (error) {
            throw new Error(error.message);
        }

        const id = data.user?.id;
        
        if (!id) {
            throw new Error("Failed to create new user");
        }

        const newAuthorResponse = await createNewAuthorService(id);

        if (newAuthorResponse.error){
            throw new Error("Failed to create new author")
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