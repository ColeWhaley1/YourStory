import supabase from "../../supabase";

const signInUserService = async (email: string, password: string): Promise<string | null> => {
    try {

        const { data, error } = await supabase.auth.signInWithPassword({
            email, password
        });
        
        if (error) {
            throw new Error(error.message);
        }

        const id = data?.user?.id;

        if (!id) {
            throw new Error("Failed to sign in user");
        }
        return id;
        
    } catch (error: any) {
        console.error(error.message);
        return null;
    }
}

export default signInUserService;