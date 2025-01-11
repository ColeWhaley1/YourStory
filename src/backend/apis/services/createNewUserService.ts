import supabase from "../../supabase";
import createNewAuthorService from "./createNewAuthorService";
import userExistsService from "./userExistsService";

interface CreateNewUserServiceResponse {
    id: string | null;
    error: string | null;
}

const createNewUserService = async (email: string, password: string): Promise<CreateNewUserServiceResponse> => {
    try {

        const userExistsResponse = await userExistsService(email);

        if (userExistsResponse.error) {
            throw new Error(userExistsResponse.error.message)
        }

        if (userExistsResponse.userExists) {
            throw new Error("There is already an account associated with this email.")
        }

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

        const newAuthorResponse = await createNewAuthorService(id, email);

        if (newAuthorResponse.error) {
            throw new Error("Failed to create new author")
        }
        
        return {
            id: id,
            error: null
        };

    } catch (error: any) {
        return {
            id: null,
            error: error.message
        };
    }
}

export default createNewUserService;