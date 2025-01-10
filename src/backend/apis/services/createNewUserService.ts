import supabase from "../../supabase";

const createNewUserService = async (email: string, password: string): Promise<string | null> => {
    try {

        // check if user already exists

        const { data, error } = await supabase.auth.signUp({
            email, password
        });

        if (error) {
            throw new Error(error.message);
        }

        const id = data.user?.id;

        // create new author with this id?

        if (!id) {
            throw new Error("Failed to create new user");
        }

        return id;
        
    } catch (error: any) {
        console.error(error.message);
        return null;
    }
}

export default createNewUserService;