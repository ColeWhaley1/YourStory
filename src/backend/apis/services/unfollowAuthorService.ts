import supabase from "../../supabase";

interface unfollowResponse {
    error: string | null
}

const unfollowAuthorService = async (currentId: string, targetId: string): Promise<unfollowResponse> => {
    try {

        const { error } = await supabase.from("follows").delete().eq("follower", currentId).eq("target", targetId);

        if(error){
            throw new Error(error.message);
        }

        return {
            error: null
        }
    } catch (error: any) {
        return {
            error: error.message
        }
    }
}

export default unfollowAuthorService;