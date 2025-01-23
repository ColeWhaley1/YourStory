import supabase from "../../supabase";

interface FollowingCountResponse {
    count: number | null,
    error: string | null,
}

const getFollowingCountService = async (id: string): Promise<FollowingCountResponse> => {
    try {

        const { count, error } = await supabase
                                            .from("follows")
                                            .select("*", { count: "exact", head: true})
                                            .eq("follower", id);
        
        
        if (error){
            throw new Error(error.message)
        } 
        
        return {
            count,
            error: null
        }
        
    } catch (error: any) {
        return {
            count: null,
            error: error.message
        }
    }
}

export default getFollowingCountService;