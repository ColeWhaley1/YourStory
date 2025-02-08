import supabase from "../../supabase";

interface FollowResponse {
    error: string | null
}

const followAuthorService = async (currentId: string, targetId: string): Promise<FollowResponse> => {
    try {

        const { error } = await supabase.from("follows").insert({
            target: targetId,
            follower: currentId
        })

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

export default followAuthorService;